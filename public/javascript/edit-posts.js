// Function to handle the edit form submission.
async function editFormHandler(event) {
    event.preventDefault(); // Prevent the default form submission behavior.

    // Get the values of the edited post's title, content, and post ID.
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('textarea[name="post-content"]').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Send a PUT request to update the post with the specified post ID.
    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Check if the response status is OK (200).
    if (response.ok) {
        // Redirect the user to the dashboard page after successfully editing the post.
        document.location.replace('/dashboard');
    } else {
        // Display an alert with the response status text in case of an error.
        alert(response.statusText);
    }
}

// Add an event listener to the edit post form's submission.
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);