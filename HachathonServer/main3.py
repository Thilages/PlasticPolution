from ultralytics import YOLO
import cv2
import matplotlib.pyplot as plt

# Load your trained YOLO model
trained_model = YOLO("./best.pt")

# Run inference with the YOLO model on the sample image
results = trained_model("./bott.jpeg")

# Set the confidence threshold
confidence_threshold = 0.4

# Extract detections
detections = results[0].boxes

# Filter detections with confidence above the threshold
filtered_detections = [box for box in detections if box.conf[0] > confidence_threshold]

# Check if any valid objects were detected
object_found = len(filtered_detections) > 0

# Load the original image
# image = cv2.imread("./bott.jpeg")
#
# # Plot only high-confidence detections
# for box in filtered_detections:
#     x1, y1, x2, y2 = box.xyxy[0].numpy()  # Get the bounding box coordinates
#     conf = box.conf[0].item()  # Get the confidence score
#     label = box.cls[0].item()  # Get the class index (you may want to map this to class names)
#
#     # Draw the bounding box and label on the image
#     cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
#     cv2.putText(image, f'{label}: {conf:.2f}', (int(x1), int(y1) - 10),
#                 cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
#
# # Convert BGR (OpenCV format) to RGB for displaying with matplotlib
# image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# Output whether an object was found with the required confidence
if object_found:
    print("Object found")
else:
    print("No object found")