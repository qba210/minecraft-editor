# minecraft-editor
A npm package that allows you to edit minecraft files saved in .minecraft dirctory

## **features:**
- Reading and writing minecraft settings

## usage:
- ### Reading minecraft options:
    ```js
    const {MinecraftOptions} = require("minecraft-editor");

    const OptionReader = new MinecraftOptions(); //or new MinecraftOptions(path/to/.minecraft)
    let Options = OptionReader.getOptions();
    ```
- ### Writing minecraft options:
    ```js
    const {MinecraftOptions} = require("minecraft-editor");

    const OptionWriter = new MinecraftOptions(); //or new MinecraftOptions(path/to/.minecraft)
    OptionWriter.setOptions(OptionWriter.getOptions());
    ```