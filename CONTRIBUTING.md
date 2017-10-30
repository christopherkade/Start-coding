## How to contribute

Please, feel free to help me fill up the resource database by following these simple steps and guidelines:


1) Fork the project
2) Open the `start-coding-resources.json` file in the project's root
3) Add your resource(s) with the following format:

    ```json
    {
      "documentation": {
        ...
        "resource-name": {
          "URL": "resource-url.com",
          "description": "Concise and relevant description",
          "level": "0",
          "name": "Resource Name",
          "tech": ["none", "angular", "nodejs", "c++"],
          "type": "general"
        }
      }
    }
    ```

    Where:
    - `level` is a number between 0 and 10, 0 being for novices and 10 being for experienced developers.
    - `tech` is an array of relevant technologies described in the resource (lower-case).
    - `type` is the type of content accessible in this resource (`web`, `q&a`, `general` etc.).


4)  Finally, submit a pull request to the repository
