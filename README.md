# YouTube Comments Toxicity Analyzer

The YouTube Comment Toxicity Analyzer is a web application that provides insights into the sentiment and toxicity of comments on YouTube videos. It helps content creators and community managers understand audience tone and engagement.

### Visit the [application](https://comments-toxicity-analyzer.vercel.app/).


## Key Features

- **Analyze YouTube Video Comments**: Enter a video URL to analyze comments based on **toxicity**, **severe toxicity**, **profanity**, **threat**, **insult**, and **identity attack**.

- **Visualize Metrics**: View results through a **distribution map**, **average percentage**, and **heatmap** for better insights.


## How to Interpret Probability Scores and Visualizations

- **Probability Score Details**: Each attribute probability score ranges from **0 to 1**, indicating the likelihood detail of the atttribute.

- **Visualization Types**:  
  - **Distribution Map**: Shows the frequency of scores for each attribute.  
  - **Average Percentage**: Summarizes overall toxicity levels.  

Example: A **toxicity score of 0.8** indicates a highly toxic comment, while a **profanity score of 0.2** suggests minimal offensive language.

## Key Technologies Used

- **Next.js**: A framework for building responsive user interfaces.  
- **FastAPI**: A high-performance web framework for creating APIs.  
- **Google Perspective**: A machine learning model to classify and score comments across six toxicity attributes.

## Future Improvements

- **Expand to More Platforms**: Extend support to other social media platforms, especially **Meta Threads** and **Reddit**, for broader analysis across various audiences.  
- **Increase Attribute Coverage**: Integrate additional attributes to provide deeper and more comprehensive insights.

## Screenshots

![image1](https://github.com/user-attachments/assets/f3f3a3e2-dea9-4945-a12e-e648bfe6a1dc)  
![image2](https://github.com/user-attachments/assets/c7fdd2a3-d4db-4794-8b1a-5a6cf3c7e5c9)  
