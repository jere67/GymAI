import google.generativeai as genai
import cv2
import os
import shutil
import os
import sys

from flask import Flask, jsonify, flash, redirect, render_template, request, session
from flask_restful import Api, Resource
from flask_cors import CORS
from tempfile import mkdtemp

# Configure API Key
genai.configure(api_key=os.environ['GOOGLE_API_KEY'])

# Set up flask environment
app = Flask(__name__)
CORS(app)
api = Api(app)

@app.route('/upload_video', methods = ['POST'])
def post():
  # Handle file upload
  uploaded_file = request.files['file']
  if uploaded_file.filename != '':
    file_path = os.path.join(mkdtemp(), uploaded_file.filename)
    uploaded_file.save(file_path)
    response = genai.upload_file(path=file_path)
    os.remove(file_path)  # Remove the temporary uploaded file
    DeadliftAnalysis.video_file_name = uploaded_file.filename  # Set the video_file_name
    return jsonify({'status': 'success', 'message': 'File uploaded successfully'})
  else:
      return jsonify({'status': 'error', 'message': 'No file uploaded'})

class DeadliftAnalysis(Resource):
  # Extract video from local files
  video_file_name = None

  def get(self):
      # Create or cleanup existing extracted image frames directory.
      video_file_name = DeadliftAnalysis.video_file_name  # Use the uploaded file name
      FRAME_EXTRACTION_DIRECTORY = "./content/frames"
      FRAME_PREFIX = "_frame"
      
      def create_frame_output_dir(output_dir):
          if not os.path.exists(output_dir):
              os.makedirs(output_dir)
          else:
              shutil.rmtree(output_dir)
              os.makedirs(output_dir)

      def extract_frame_from_video(video_file_path):
          app.logger.info(f"Extracting {video_file_path} at 1 frame per second. This might take a bit...")
          create_frame_output_dir(FRAME_EXTRACTION_DIRECTORY)
          vidcap = cv2.VideoCapture(video_file_path)
          fps = vidcap.get(cv2.CAP_PROP_FPS)
          frame_duration = 1 / fps  # Time interval between frames (in seconds)
          output_file_prefix = os.path.basename(video_file_path).replace('.', '_')
          frame_count = 0
          count = 0
          while vidcap.isOpened():
              success, frame = vidcap.read()
              if not success: # End of video
                  break
              if int(count / fps) == frame_count: # Extract a frame every second
                  min = frame_count // 60
                  sec = frame_count % 60
                  time_string = f"{min:02d}:{sec:02d}"
                  image_name = f"{output_file_prefix}{FRAME_PREFIX}{time_string}.jpg"
                  output_filename = os.path.join(FRAME_EXTRACTION_DIRECTORY, image_name)
                  cv2.imwrite(output_filename, frame)
                  frame_count += 1
              count += 1
          vidcap.release() # Release the capture object\n",
          print(f"Completed video frame extraction!\n\nExtracted: {frame_count} frames")

      extract_frame_from_video(video_file_name)

      class File:
          def __init__(self, file_path: str, display_name: str = None):
              self.file_path = file_path
              if display_name:
                  self.display_name = display_name
              self.timestamp = get_timestamp(file_path)

          def set_file_response(self, response):
              self.response = response

      def get_timestamp(filename):
          """Extracts the frame count (as an integer) from a filename with the format
              'output_file_prefix_frame00:00.jpg'.
          """
          parts = filename.split(FRAME_PREFIX)
          if len(parts) != 2:
              return None  # Indicates the filename might be incorrectly formatted
          return parts[1].split('.')[0]

      # Process each frame in the output directory
      files = os.listdir(FRAME_EXTRACTION_DIRECTORY)
      files = sorted(files)
      files_to_upload = []
      for file in files:
          files_to_upload.append(
              File(file_path=os.path.join(FRAME_EXTRACTION_DIRECTORY, file)))

      # Upload the files to the API
      # Only upload a 10 second slice of files to reduce upload time.
      # Change full_video to True to upload the whole video.
      full_video = False

      uploaded_files = []
      print(f'Uploading {len(files_to_upload) if full_video else 10} files. This might take a bit...')

      for file in files_to_upload if full_video else files_to_upload[0:10]:
          print(f'Uploading: {file.file_path}...')
          response = genai.upload_file(path=file.file_path)
          file.set_file_response(response)
          uploaded_files.append(file)

      print(f"Completed file uploads!\n\nUploaded: {len(uploaded_files)} files")

      # List files uploaded in the API
      for n, f in zip(range(len(uploaded_files)), genai.list_files()):
          print(f.uri)

      # Create the prompt.
      prompt = "You are a professional personal trainer. Analyze the form on this lift. Give this lift a rating out of 10. Here is how I want you to give your output: Do not include a title, and jump straight to your analysis. Include three sections: Positives, Areas for Improvement, and Recommendations. Bold and italicize the titles. Have two-three short, but concise bullet points in each section. Underline the element being analyzed. Do not include a disclaimer at the end."

      # Set the model to Gemini 1.5 Pro.
      model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")

      # Make GenerateContent request with the structure described above.
      def make_request(prompt, files):
          request = [prompt]
          for file in files:
              request.append(file.timestamp)
              request.append(file.response)
          return request

      # Make the LLM request.
      request = make_request(prompt, uploaded_files)
      response = model.generate_content(request,
                                        request_options={"timeout": 600})
      
      # Return the response as JSON
      return jsonify({'analysis': response.text})

api.add_resource(DeadliftAnalysis, '/analyze_deadlift')

@app.route('/api/data', methods = ['GET'])
def index():
    return jsonify({"analysis":"World"})

if __name__ == "__main__":
    app.run(host = "127.0.0.1", port=5000, debug=True)
