---
id: "0bdcfb91a745"
slug: "best-practices-for-streamlit-development-structuring-code-and-managing-session-state"
title: "Best Practices for Streamlit Development: Structuring Code and Managing Session State"
publishedAt: "2025-02-23"
author: "Jaswanth"
category: "Data applications"
---

# Best Practices for Streamlit Development: Structuring Code and Managing Session State

## Introduction

Streamlit is a popular open-source Python framework that allows developers to quickly create interactive web applications with minimal effort. As more developers turn to Streamlit for building data-driven applications, it’s important to follow best practices for structuring the code, managing session states, and handling complex functionalities such as row-level modifications and grouping.

This document is designed to provide Streamlit developers with strategies for managing session states, organizing code, and optimizing performance in complex projects. The document also highlights common challenges faced during Streamlit development and offers solutions to streamline development and enhance the overall user experience.

## Key Concepts

Before diving into best practices, let’s understand some key concepts in Streamlit development.

### 1. Session State in Streamlit

Session state in Streamlit is a way to store variables and data across app reruns. By default, Streamlit’s session state is reset every time the page is refreshed, making it difficult to persist data between interactions. However, Streamlit provides the ability to manage session state by using `st.session_state`.

The following are some key points about session state:

- **Storing Variables:** You can store data in `st.session_state` to persist it across reruns.
- **Accessing Session State:** You can access session state using `st.session_state.<variable_name>`.
- **Handling Errors:** Be aware that if the same variable name exists in the session state, it may throw errors. To prevent this, always ensure that unique keys are used or append an index to the variable names.

### 2. Modular Code Structure

In complex Streamlit applications, especially those with hundreds of lines of code, modularity becomes key. The code should be structured in a way that makes it easy to understand, maintain, and extend. Dividing the code into multiple modules helps achieve this.

### 3. Handling Row-Level Modifications in Table

For data-heavy applications, it’s often necessary to show rows of data, along with actionable buttons for each row. Streamlit allows you to display data in a tabular format using `st.dataframe` or `st.table`. However, when you need row-level customization or actions (e.g., edit, delete, or update), you must use `for` loops to iterate over the rows and create buttons for each.

### 4. Grouping Data and Conditional Logic

In cases where you need to perform advanced grouping of data (such as grouping based on logical conditions like AND/OR), or you need to manage multiple selections or subgroups, session state can be particularly challenging. When working with these kinds of features, maintaining the integrity of session state and ensuring that the data doesn’t conflict is crucial.

### 5. SQLAlchemy Integration

In many Streamlit applications, SQLAlchemy is used to manage the backend database. It provides an Object-Relational Mapping (ORM) layer to interact with SQL databases in a Pythonic manner. Streamlit’s seamless integration with SQLAlchemy makes it an ideal solution for handling database interactions.

## Best Practices for Structuring Streamlit Code

### 1. Organize Code into Modules

In a large Streamlit application, it’s essential to keep the code modular. Split the application into separate modules for better readability and maintainability. A typical project structure might look like this:

```text
project/
│
├── app_core/ # Backend logic and SQLAlchemy-related code
│   ├── database.py # Database connection and models
│   ├── queries.py # SQL queries and helpers
│   └── utils.py # Utility functions
│
├── pages/ # Frontend related code
│   ├── home.py # Home page of the app
│   ├── settings.py # Settings page
│   └── reports.py # Report generation page
│
└── main.py # Main entry point to run the Streamlit app
```

### 2. Handle Session State Carefully

When working with session state in Streamlit, follow these best practices:

- **Use unique variable names** to avoid conflicts, especially when multiple parts of the app are interacting with the session state. Consider appending an index or identifier if the same variable name might appear in different contexts.
- **Check for the presence of variables** in session state before using them. For example:

```python
if 'my_variable' not in st.session_state:
    st.session_state['my_variable'] = []
```

- **Save the state of widgets** such as checkboxes, sliders, and text inputs using session state to persist their values between app reruns.

### 3. Create Helper Functions for Repetitive Tasks

In large applications, repetitive tasks should be abstracted into helper functions. For example, displaying rows of data with action buttons can be abstracted into a reusable function:

```python
def display_row_with_buttons(data):
    for idx, row in data.iterrows():
        col1, col2 = st.columns([1, 3])
        col1.write(row['column_name'])
        col2.button(f"Action {idx}", key=f"button_{idx}")
```

This approach keeps the code DRY (Don’t Repeat Yourself) and improves readability.

### 4. Use Loops for Dynamic Content

When you need to display dynamic content (e.g., rows of data or complex forms), using loops can simplify the logic. For example, displaying grouped data with checkboxes:

```python
group_names = ['Group 1', 'Group 2', 'Group 3']
selected_groups = []
for group in group_names:
    if st.checkbox(f'Select {group}'):
        selected_groups.append(group)
```

For handling grouping with logical conditions (AND/OR), carefully manage the session state to avoid conflicts. This may involve combining the selections into a single session state variable and implementing the logic based on the user’s selections.

### 5. SQLAlchemy and Backend Integration

When integrating Streamlit with SQLAlchemy for database operations:

- Define database models and CRUD (Create, Read, Update, Delete) operations in the `app_core` module.
- Use SQLAlchemy queries to interact with the database and pass the results to the frontend.
- Consider creating utility functions to handle common queries or data transformations, and use them in your pages as needed.

Example of SQLAlchemy integration:

```python
from app_core.database import session, MyModel

def get_data_from_db():
    return session.query(MyModel).all()

def insert_data_to_db(data):
    new_data = MyModel(name=data)
    session.add(new_data)
    session.commit()
```

### 6. Error Handling and Debugging

Streamlit does not have a built-in error handling mechanism. It’s important to handle errors gracefully, especially when working with database connections, session state, or user inputs. Always use `try-except` blocks where needed.

## Conclusion

Streamlit is a powerful tool for building data-driven applications with minimal effort. However, as projects grow in complexity, managing session state, modularizing code, and implementing advanced features can become challenging. By following best practices such as modular code organization, careful session state management, and using loops for dynamic content, developers can create maintainable and efficient Streamlit applications.

For more advanced scenarios, such as working with SQLAlchemy or implementing complex logical conditions, the strategies discussed in this document can help developers streamline development and ensure their applications perform as expected.

**Author:**  
Jaswanth  
Software Engineer, Sedin Technologies  
24/02/2025
