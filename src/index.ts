import fs from "fs";

export enum MinecraftGuiScale{
    AUTO = 0,
    ONE = 1,
    TWO = 2,
    THREE = 3
}

export enum MinecraftParticleOpions{
    ALL = 0,
    DECREASED = 1,
    MINIMAL = 2
}

export enum MinecraftGraphicsMode{
    FAST = 0,
    FANCY = 1,
    FABULOUS = 2
}

export enum MinecraftAoMode{
    OFF = 0,
    MINIMUM = 1,
    MAXIMUM = 2
}

export enum MinecraftPrioritizeChunkUpdates{
    THREADED = 0,
    SEMI_BLOCKING = 1,
    FULLY_BLOCKING = 2
}

export enum MinecraftChatVisibility{
    SHOWN = 0,
    COMMANDS_ONLY = 1,
    HIDDEN = 0
}

export enum MinecraftAttackIndicatorOption{
    OFF = 0,
    CROSSHAIR = 1,
    HOTBAR = 2
}

export enum MinecraftLWJGLLogLevel{
    NONE = 0,
    HIGH = 1,
    MEDIUM = 2,
    LOW = 3,
    NOTIFICATION = 4
}

export interface MinecraftOptionsFile{
    version: number;
    autoJump: boolean;
    autoSuggestions: boolean;
    chatColors: boolean;
    chatLinks: boolean;
    chatLinksPrompt: boolean;
    enableVsync: boolean;
    entityShadows: boolean;
    forceUnicodeFont: boolean;
    discrete_mouse_scroll: boolean;
    invertYMouse: boolean;
    realmsNotifications: boolean;
    reducedDebugInfo: boolean;
    showSubtitles: boolean;
    touchscreen: boolean;
    fullscreen: boolean;
    bobView: boolean;
    toggleCrouch: boolean;
    toggleSprint: boolean;
    darkMojangStudiosBackground: boolean;
    hideLightningFlashes: boolean;
    mouseSensitivity: number;
    fov: number;
    screenEffectScale: number;
    fovEffectScale: number;
    gamma: number;
    renderDistance: number;
    simulationDistance: number;
    entityDistanceScaling: number;
    guiScale: MinecraftGuiScale;
    particles: MinecraftParticleOpions;
    maxFps: number;
    /**
     * @description Has no effect after 1.7.2
     * @deprecated
     */
    difficulty?: number;
    graphicsMode: MinecraftGraphicsMode;
    /**
     * @description Smooth Lighting
     */
    ao: MinecraftAoMode;
    prioritizeChunkUpdates: MinecraftPrioritizeChunkUpdates;
    biomeBlendRadius: number;
    renderClouds: boolean | "fast";
    resourcePacks: string[];
    incompatibleResourcePacks: string[];
    lastServer: string;
    lang: string;
    soundDevice: string;
    chatVisibility: MinecraftChatVisibility;
    chatOpacity: number;
    chatLineSpacing: number;
    textBackgroundOpacity: number;
    backgroundForChatOnly: boolean;
    /**
     * @description Has no effect in modern versions
     * @deprecated
     */
    hideServerAddress?: boolean;
    advancedItemTooltips: boolean;
    pauseOnLostFocus: boolean;
    overrideWidth: number;
    overrideHeight: number;
    heldItemTooltips: boolean;
    chatHeightFocused: number;
    chatDelay: number;
    chatHeightUnfocused: number;
    chatScale: number;
    chatWidth: number;
    mipmapLevels: number;
    useNativeTransport: boolean;
    mainHand: "left" | "right";
    attackIndicator: MinecraftAttackIndicatorOption;
    narrator: 0 | 1 | 2 | 3;
    tutorialStep: "movement" | "find_tree" | "punch_tree" | "open_inventory" | "craft_planks" | "none";
    mouseWheelSensitivity: number;
    rawMouseInput: boolean;
    /**
     * @description LWJGL log info level (only on some machines)
     */
    glDebugVerbosity: MinecraftLWJGLLogLevel;
    skipMultiplayerWarning: boolean;
    hideMatchedNames: boolean;
    joinedFirstServer: boolean;
    hideBundleTutorial: boolean;
    syncChunkWrites: boolean;
    showAutosaveIndicator: boolean;
    allowServerListing: boolean;
}

/**
 * @param value value
 * @returns Fov in degrees
 */
export function OptionsFovToDegrees(value: number){
    return 40 * value + 70;
}

export class MinecraftOptions{
    path: string;

    constructor(mcPath?: string){
        if (mcPath){
            if (fs.existsSync(mcPath)){
                if (fs.statSync(mcPath).isDirectory()){
                    this.path = mcPath;
                    if (!this.path.endsWith("/") || !this.path.endsWith("\\")){
                        this.path += "/";
                    }
                }else{
                    throw new Error("Not a directory");
                }
            }else{
                throw new Error("Path does not exists");
            }
        }else{
            this.path = require("minecraft-folder-path") + "/";
        }
    }

    /**
     * @description Gets minecraft options
     * @returns Minecraft options
     */
    getOptions(): MinecraftOptionsFile{
        let file = fs.readFileSync(this.path + "options.txt", "utf-8");
        let options = file.split("\r\n");
        let map: Map<String, any> = new Map<String, any>();
        options.forEach(option => {
            let opt = option.split(":");
            map.set(opt[0], opt[1] ?? null);
        })
        return {
            version: map.get("version") ?? 2865,
            autoJump: map.get("autoJump") ?? true,
            autoSuggestions: map.get("autoSuggestions") ?? true,
            chatColors: map.get("chatColors") ?? true,
            chatLinks: map.get("chatLinks") ?? true,
            chatLinksPrompt: map.get("chatLinksPrompt") ?? true,
            enableVsync: map.get("enableVsync") ?? true,
            entityShadows: map.get("entityShadows") ?? true,
            forceUnicodeFont: map.get("forceUnicodeFont") ?? false,
            discrete_mouse_scroll: map.get("discrete_mouse_scroll") ?? false,
            invertYMouse: map.get("invertYMouse") ?? false,
            realmsNotifications: map.get("realmsNotifications") ?? true,
            reducedDebugInfo: map.get("reducedDebugInfo") ?? false,
            showSubtitles: map.get("showSubtitles") ?? false,
            touchscreen: map.get("touchscreen") ?? false,
            fullscreen: map.get("fullscreen") ?? false,
            bobView: map.get("bobView") ?? true,
            toggleCrouch: map.get("toggleCrouch") ?? false,
            toggleSprint: map.get("toggleSprint") ?? false,
            darkMojangStudiosBackground: map.get("darkMojangStudiosBackground") ?? false,
            hideLightningFlashes: map.get("hideLightningFlashes") ?? false,
            mouseSensitivity: map.get("mouseSensitivity") ?? 0.5,
            fov: map.get("fov") ?? 0,
            screenEffectScale: map.get("screenEffectScale") ?? 1.0,
            fovEffectScale: map.get("fovEffectScale") ?? 1.0,
            gamma: map.get("gamma") ?? 0.5,
            renderDistance: map.get("renderDistance") ?? (()=>{if (process.arch === "x64") return 12; else return 8; })(),
            simulationDistance: map.get("simulationDistance") ?? (()=>{if (process.arch === "x64") return 12; else return 8; })(),
            entityDistanceScaling: map.get("entityDistanceScaling") ?? 1.0,
            guiScale: map.get("guiScale") ?? MinecraftGuiScale.AUTO,
            particles: map.get("particles") ?? MinecraftParticleOpions.ALL,
            maxFps: map.get("maxFps") ?? 120,
            difficulty: map.get("difficulty") ?? 2,
            graphicsMode: map.get("graphicsMode") ?? MinecraftGraphicsMode.FANCY,
            ao: map.get("ao") ?? MinecraftAoMode.MAXIMUM,
            prioritizeChunkUpdates: map.get("prioritizeChunkUpdates") ?? MinecraftPrioritizeChunkUpdates.THREADED,
            biomeBlendRadius: map.get("biomeBlendRadius") ?? 2,
            renderClouds: map.get("renderClouds") ?? true,
            resourcePacks: [map.get("resourcePacks")] ?? [],
            incompatibleResourcePacks: [map.get("graphicsMode")] ?? [],
            lastServer: map.get("lastServer") ?? "",
            lang: map.get("lang") ?? "en_us",
            soundDevice: map.get("soundDevice") ?? "",
            chatVisibility: map.get("chatVisibility") ?? MinecraftChatVisibility.SHOWN,
            chatOpacity: map.get("chatOpacity") ?? 1.0,
            chatLineSpacing: map.get("chatLineSpacing") ?? 0.0,
            textBackgroundOpacity: map.get("textBackgroundOpacity") ?? 0.5,
            backgroundForChatOnly: map.get("lastServer") ?? true,
            hideServerAddress: map.get("hideServerAddress") ?? false,
            advancedItemTooltips: map.get("advancedItemTooltips") ?? false,
            pauseOnLostFocus: map.get("pauseOnLostFocus") ?? true,
            overrideWidth: map.get("overrideWidth") ?? 0,
            overrideHeight: map.get("overrideHeight") ?? 0,
            heldItemTooltips: map.get("heldItemTooltips") ?? true,
            chatHeightFocused: map.get("chatHeightFocused") ?? 1.0,
            chatDelay: map.get("chatDelay") ?? 0.0,
            chatHeightUnfocused: map.get("chatHeightUnfocused") ?? 0.44366195797920227,
            chatScale: map.get("chatScale") ?? 1.0,
            chatWidth: map.get("chatWidth") ?? 1.0,
            mipmapLevels: map.get("mipmapLevels") ?? 4,
            useNativeTransport: map.get("useNativeTransport") ?? true,
            mainHand: map.get("mainHand") ?? "right",
            attackIndicator: map.get("attackIndicator") ?? MinecraftAttackIndicatorOption.CROSSHAIR,
            narrator: map.get("narrator") ?? 0,
            tutorialStep: map.get("tutorialStep") ?? "movement",
            mouseWheelSensitivity: map.get("mouseWheelSensitivity") ?? 1.0,
            rawMouseInput: map.get("rawMouseInput") ?? true,
            glDebugVerbosity: map.get("glDebugVerbosity") ?? MinecraftLWJGLLogLevel.HIGH,
            skipMultiplayerWarning: map.get("skipMultiplayerWarning") ?? false,
            hideMatchedNames: map.get("hideMatchedNames") ?? true,
            joinedFirstServer: map.get("joinedFirstServer") ?? false,
            hideBundleTutorial: map.get("hideBundleTutorial") ?? false,
            syncChunkWrites: map.get("syncChunkWrites") ?? true,
            showAutosaveIndicator: map.get("showAutosaveIndicator") ?? true,
            allowServerListing: map.get("allowServerListing") ?? true,
        };
    }

    /**
     * @description Sets minecraft options
     * @param options Options to write
     */
    setOptions(options: MinecraftOptionsFile){
        let json = options as {[k: string]: any};
        let sstr = "";
        for (let obj in json){
            sstr += `${obj}:${json[obj]}\r\n`;
        }
        fs.writeFileSync(this.path + "options.txt", sstr, {encoding: "utf-8"});
    }
}

export interface MinecraftResourcepackLanguage{
    code: string;
    name: string;
    region: string;
    bidirectional: boolean;
}

export interface MinecraftResourcepack{
    filename: string;
    isZip: boolean;
    isValid?: boolean;
    packFormat: number;
    description: string;
    languages?: MinecraftResourcepackLanguage[];
}

export class MinecraftResourcepacks{
    respacksPath: string;

    protected constructor(respackPath: string){
        this.respacksPath = respackPath;
    }
    static fromDefaultDir(): MinecraftResourcepacks{
        return new MinecraftResourcepacks(require("minecraft-folder-path") + "/resourcepacks/");
    }
    static fromMinecraftDir(mcPath: string): MinecraftResourcepacks{
        let path;
        if (mcPath){
            if (fs.existsSync(mcPath)){
                if (fs.statSync(mcPath).isDirectory()){
                    path = mcPath;
                    if (!path.endsWith("/") || !path.endsWith("\\")){
                        path += "/";
                    }
                }else{
                    throw new Error("Not a directory");
                }
            }else{
                throw new Error("Path does not exists");
            }
        }else{
            return new MinecraftResourcepacks(require("minecraft-folder-path") + "/resourcepacks/");
        }
        return new MinecraftResourcepacks(path + "resourcepacks/");
    }
    static fromResourcepacksDir(resPath: string): MinecraftResourcepacks{
        let path;
        if (resPath){
            if (fs.existsSync(resPath)){
                if (fs.statSync(resPath).isDirectory()){
                    path = resPath;
                    if (!path.endsWith("/") || !path.endsWith("\\")){
                        path += "/";
                    }
                }else{
                    throw new Error("Not a directory");
                }
            }else{
                throw new Error("Path does not exists");
            }
        }else{
            return new MinecraftResourcepacks(require("minecraft-folder-path") + "/resourcepacks/");
        }
        return new MinecraftResourcepacks(path);
    }

    getResourcepacks(): MinecraftResourcepack[]{
        let respacks = fs.readdirSync(this.respacksPath, {withFileTypes: true});
        let metas: MinecraftResourcepack[] = [];
        for (let ipack in respacks) {
            let pack = respacks[ipack];
            if (pack.isDirectory()){
                let json: any;
                try{
                    json = JSON.parse(fs.readFileSync(`${this.respacksPath}${pack.name}/pack.mcmeta`, "utf-8"));
                }catch{
                    metas.push({
                        filename: pack.name,
                        isZip: pack.isFile() && pack.name.endsWith(".zip"),
                        isValid: false,
                        packFormat: -1,
                        description: ""
                    })
                    continue;
                }
                let langs: MinecraftResourcepackLanguage[] = [];
                if (json.language){
                    Object.entries(json.language).forEach(([key, val]) => {
                        let value: any = val;
                        langs.push({
                            code: key,
                            name: value.name,
                            region: value.region,
                            bidirectional: value.bidirectional
                        });
                    });
                }
                metas.push({
                    filename: pack.name,
                    isZip: pack.isFile() && pack.name.endsWith(".zip"),
                    description: json.pack.description,
                    packFormat: json.pack.pack_format,
                    languages: langs
                });
            }
        }
        return metas;
    }
}