// Function to handle submitting a comment.
async function commentFormHandler(event) {
    event.preventDefault(); // Prevent the default behavior of the form submission.

    // Get the value of the comment text input field.
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

    // Get the post ID from the URL.
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Check if comment text is provided.
    if (comment_text) {
        // Send a POST request to the '/api/comments' endpoint to create a new comment.
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Check if the response status is OK (200).
        if (response.ok) {
            // Reload the page to display the new comment.
            document.location.reload();
        } else {
            // Display an alert with the response status text in case of an error.
            alert(response.statusText);
        }
    }
}

// Add an event listener to the comment form's submission.
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);