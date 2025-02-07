from collections import defaultdict
import googleapiclient.discovery
import re
import os

MAX_COMMENTS = 500

PERSPECTIVE_API_KEY = os.getenv("PERSPECTIVE_API_KEY")
PERSPECTIVE_API_KEY_2 = os.getenv("PERSPECTIVE_API_KEY_2")

api_service_name = "youtube"
api_version = "v3"
youtube = googleapiclient.discovery.build(api_service_name, api_version, developerKey=PERSPECTIVE_API_KEY)
comment_analyzer = googleapiclient.discovery.build(
    "commentanalyzer",
    "v1alpha1",
    developerKey=PERSPECTIVE_API_KEY,
    discoveryServiceUrl="https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1",
    static_discovery=False,
)

def get_youtube_info(post_id):
    request = youtube.videos().list(
        part="snippet",
        id=post_id
    )
    result = request.execute()
    response = {
        "title": result["items"][0]["snippet"]["title"]
    }
    return response

def get_youtube_comments_helper(post_id, response, comments):
    if (response and "nextPageToken" not in response) or len(comments) >= MAX_COMMENTS:
        return comments

    request = youtube.commentThreads().list(
        part="snippet",
        videoId=post_id,
        maxResults=100,
        pageToken=response.get("nextPageToken") if response else None,
    )

    cur_response = request.execute()
    for item in cur_response["items"]:
        comments.append(item["snippet"]["topLevelComment"]["snippet"]["textDisplay"])

    return get_youtube_comments_helper(post_id, cur_response, comments)


def analyze_youtube_comments_helper(comments):
    metrics_map = defaultdict(list)
    for comment in comments:
        try:
            analyze_request = {
                'comment': {'text': comment},
                'requestedAttributes': {
                    'TOXICITY': {},
                    'SEVERE_TOXICITY': {},
                    'IDENTITY_ATTACK': {},
                    'INSULT': {},
                    'PROFANITY': {},
                    'THREAT': {}
                }
            }
            response = comment_analyzer.comments().analyze(body=analyze_request).execute()
            for metric, data in response["attributeScores"].items():
                metrics_map[metric].append(data["summaryScore"]["value"])
        except Exception as e:
            pass

    return metrics_map


def extract_youtube_id(url: str) -> str:
    # Define regex pattern to match YouTube video ID
    youtube_regex = (
        r"(?:https?://(?:www\.|m\.)?youtube\.com(?:/[^/]+)*/(?:v|watch\?v=|e/)[^&?/]+)"
    )

    # Extract YouTube video ID using regex
    match = re.search(r"(?<=v=)[^&?]*", url)
    if match:
        return match.group(0)

    # If the match fails, return an empty string
    return ""
