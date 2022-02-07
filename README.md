# minecraft-editor
A npm package that allows you to edit minecraft files saved in .minecraft dirctory

## **features:**
- Reading and writing minecraft settings
- Reading minecraft resourcepacks (only directory, does not read zip)

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
- ### Reading minecraft resourcepacks:
    ```js
    const { MinecraftResourcepacks } = require("minecraft-editor");

    let ResourcepacksReader = MinecraftResourcepacks.fromDefaultDir();
    /*
    or, if you want to specify minecraft directrory use MinecraftResourcepacks.fromMinecraftDir(path/to/.minecraft);

    or, if you want to specify resourcepacks directrory use MinecraftResourcepacks.fromResourcepacksDir(path/to/resourcepacks);
    */
    let Resourcepacks = ResourcepacksReader.getResourcepacks();
    ```