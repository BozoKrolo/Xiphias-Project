## Todo List Web App with Custom and Fetched Todos Overview

This project is a dynamic Todo List web application built using Web Components. It allows users to create and manage their own custom todos as well as fetch a specified number of todos from a dummy JSON API.

## Features

    -Custom Todos: Users can create, update, check, and delete their own custom todos.

    -Fetch Todos: Users can fetch a specified number of todos (up to 30) from the DummyJSON API and manage them within the app.

    -Error Handling: The app provides visual feedback if there's an issue, such as invalid input or a problem fetching data.

    -Success Messages: Users receive a success message when todos are successfully fetched from the API.

    -Todo Management: Separate buttons allow users to delete all custom todos, all fetched todos, or all todos (both custom and fetched).

    -Responsive Design: The app is designed to be responsive and accessible across various devices.

## Usage

## Custom Todos

    Adding a Custom Todo:
        Click the "Create Custom Todo" button to add a new todo item.
        The new todo will appear in the list with the text "Task X", where X is the next available ID.

    Editing a Custom Todo:
        Click on the todo item text to edit it.
        Press Enter or click outside the input field to save the changes.

    Checking/Unchecking a Todo:
        Use the checkbox next to each todo to mark it as completed or incomplete.

    Deleting a Custom Todo:
        Click the trash icon button next to the todo item to remove it.

## Fetched Todos

    Fetching Todos:
        Enter a number between 1 and 30 in the input field.
        Click the "Fetch Todos" button to retrieve todos from the DummyJSON API.
        A success message will appear if the fetch is successful.

    Deleting Fetched Todos:
        Use the "Delete Fetched Todos" button to remove all fetched todos from the list.

## Additional Features

    Delete All Todos: Use the "Delete All Todos" button to remove both custom and fetched todos from the list.
    Error Handling: If invalid input is provided or an issue occurs during the fetch, an error message will be displayed.
