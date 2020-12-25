var fs = require('fs');
var fsPath = require('fs-path');
let input = require('./input.json');
let movesInp = require('./inputmoves.json')
let movesP2inp = require('./inputmovesp2.json')
let movesP3inp = require('./inputmovesp3.json')
let movesP4inp = require('./inputmovesp4.json')
let gmsInp = require('./inputgms.json')
let songPreviewBeatsInput = require('./inputsongpreviewbeats.json')
let gmsObj = JSON.stringify(gmsInp);
let gmsPar = JSON.parse(gmsObj);
let movesObj = JSON.stringify(movesInp);
let movesPar = JSON.parse(movesObj);
let movesP2obj = JSON.stringify(movesP2inp);
let movesP2par = JSON.parse(movesP2obj);
let movesP3obj = JSON.stringify(movesP3inp);
let movesP3par = JSON.parse(movesP3obj);
let movesP4obj = JSON.stringify(movesP4inp);
let movesP4par = JSON.parse(movesP4obj);
var jsonObj = JSON.stringify(input);
var jsonPar = JSON.parse(jsonObj);
var songPreviewBeatsObj = JSON.stringify(songPreviewBeatsInput);
var songPreviewBeatsPar = JSON.parse(songPreviewBeatsObj);
let division = 2502.66305525460462 / (60000 / (jsonPar.beats[30] - jsonPar.beats[29])); 
let lyrics = jsonPar.lyrics;
let ktape = ({
    "__class": "Tape",
    "Clips": [],
    "TapeClock": 0,
    "TapeBarCount": 1,
    "FreeResourcesAfterPlay": 0,
    "MapName": jsonPar.MapName
})

let dtape = ({
    "__class": "Tape",
    "Clips": [],
    "TapeClock": 0,
    "TapeBarCount": 1,
    "FreeResourcesAfterPlay": 0,
    "MapName": jsonPar.MapName
})


beatsModified = jsonPar.beats.map(function(x) {
    return (x - jsonPar.videoOffset) * 48;
});

let previewEntry = ""
if (!jsonPar.AudioPreview.coverflow) {
	previewEntry = 0
}
if (jsonPar.AudioPreview.coverflow) {
	previewEntry = jsonPar.AudioPreview.coverflow.startbeat
}


let musictrack = ({
    "__class": "Actor_Template",
    "WIP": 0,
    "LOWUPDATE": 0,
    "UPDATE_LAYER": 0,
    "PROCEDURAL": 0,
    "STARTPAUSED": 0,
    "FORCEISENVIRONMENT": 0,
    "COMPONENTS": [{
        "__class": "MusicTrackComponent_Template",
        "trackData": {
            "__class": "MusicTrackData",
            "structure": {
                "__class": "MusicTrackStructure",
                "markers": beatsModified,
                "signatures": [{
                    "__class": "MusicSignature",
                    "marker": 1,
                    "beats": 3
                }, {
                    "__class": "MusicSignature",
                    "marker": 4,
                    "beats": 4
                }, {
                    "__class": "MusicSignature",
                    "marker": 194,
                    "beats": 3
                }, {
                    "__class": "MusicSignature",
                    "marker": 197,
                    "beats": 4
                }],
                "sections": [{
                    "__class": "MusicSection",
                    "marker": 1,
                    "sectionType": 6,
                    "comment": ""
                }, {
                    "__class": "MusicSection",
                    "marker": 19,
                    "sectionType": 1,
                    "comment": ""
                }, {
                    "__class": "MusicSection",
                    "marker": 52,
                    "sectionType": 7,
                    "comment": ""
                }, {
                    "__class": "MusicSection",
                    "marker": 68,
                    "sectionType": 3,
                    "comment": ""
                }, {
                    "__class": "MusicSection",
                    "marker": 84,
                    "sectionType": 7,
                    "comment": ""
                }, {
                    "__class": "MusicSection",
                    "marker": 100,
                    "sectionType": 1,
                    "comment": ""
                }, {
                    "__class": "MusicSection",
                    "marker": 132,
                    "sectionType": 7,
                    "comment": ""
                }, {
                    "__class": "MusicSection",
                    "marker": 148,
                    "sectionType": 3,
                    "comment": ""
                }, {
                    "__class": "MusicSection",
                    "marker": 164,
                    "sectionType": 7,
                    "comment": ""
                }, {
                    "__class": "MusicSection",
                    "marker": 190,
                    "sectionType": 3,
                    "comment": ""
                }, {
                    "__class": "MusicSection",
                    "marker": 196,
                    "sectionType": 2,
                    "comment": ""
                }, {
                    "__class": "MusicSection",
                    "marker": 194,
                    "sectionType": 6,
                    "comment": ""
                }, {
                    "__class": "MusicSection",
                    "marker": 259,
                    "sectionType": 3,
                    "comment": ""
                }, {
                    "__class": "MusicSection",
                    "marker": 195,
                    "sectionType": 7,
                    "comment": ""
                }, {
                    "__class": "MusicSection",
                    "marker": 291,
                    "sectionType": 7,
                    "comment": ""
                }],
                "startBeat": 0,
                "endBeat": jsonPar.beats.length,
                "videoStartTime": 0,
                "previewEntry": (Math.floor(songPreviewBeatsPar.enterTime / (jsonPar.beats[30] - jsonPar.beats[29]))) || previewEntry || 0,
                "previewLoopStart": (Math.floor(songPreviewBeatsPar.loopStartTime / (jsonPar.beats[30] - jsonPar.beats[29]))) || previewEntry || 0,
                "previewLoopEnd": Math.floor(songPreviewBeatsPar.loopEndTime / (jsonPar.beats[30] - jsonPar.beats[29])) || jsonPar.beats.length,
                "volume": 0
            },
            "path": "world/maps/" + jsonPar.MapName.toLowerCase() + "/audio/" + jsonPar.MapName.toLowerCase() + ".wav",
            "url": "jmcs://jd-contents/" + jsonPar.MapName + "/" + jsonPar.MapName + ".ogg"
        }
    }]
})




let musictrackFinal = JSON.stringify(musictrack);
fsPath.writeFile("output/" + jsonPar.MapName + "/" + jsonPar.MapName.toLowerCase() + "_musictrack.tpl.ckd", musictrackFinal, function(err) {
    if (err) {
        console.log(err);
    }
});


for (i = 0; i < jsonPar.lyrics.length; i++) {
    jsonPar.lyrics[i].duration = jsonPar.lyrics[i].duration / division;
    jsonPar.lyrics[i].duration = Math.floor(jsonPar.lyrics[i].duration);
    jsonPar.lyrics[i].time = (jsonPar.lyrics[i].time - jsonPar.videoOffset) / division;
    jsonPar.lyrics[i].time = Math.floor(jsonPar.lyrics[i].time);

    jsonPar.lyrics[i]["__class"] = "KaraokeClip";
    jsonPar.lyrics[i]["Id"] = i + 1;
    jsonPar.lyrics[i]["TrackId"] = 0;
    jsonPar.lyrics[i]["IsActive"] = 1;
    jsonPar.lyrics[i]["StartTime"] = jsonPar.lyrics[i].time;
    var duration = jsonPar.lyrics[i].duration;
    var text = jsonPar.lyrics[i].text;
    var lineending = jsonPar.lyrics[i].isLineEnding;
    if (!jsonPar.lyrics[i].isLineEnding) {
        var lineending = 0
    }
    var time = jsonPar.lyrics[i].time;
    delete jsonPar.lyrics[i]["duration"];
    jsonPar.lyrics[i]["Duration"] = duration;
    jsonPar.lyrics[i]["Pitch"] = "8.661958";
    jsonPar.lyrics[i]["Lyrics"] = jsonPar.lyrics[i].text;
    jsonPar.lyrics[i]["IsEndOfLine"] = jsonPar.lyrics[i].isLineEnding;
    jsonPar.lyrics[i]["ContentType"] = 1;
    jsonPar.lyrics[i]["StartTimeTolerance"] = 4;
    jsonPar.lyrics[i]["EndTimeTolerance"] = 4;
    jsonPar.lyrics[i]["SemitoneTolerance"] = 5;
    delete jsonPar.lyrics[i]["time"];
    delete jsonPar.lyrics[i]["text"];
    delete jsonPar.lyrics[i]["isLineEnding"];

    ktape.Clips.push({
        "__class": "KaraokeClip",
        "Id": i + 1,
        "TrackId": 0,
        "IsActive": 1,
        "StartTime": time,
        "Duration": duration,
        "Pitch": 8.661958,
        "Lyrics": text,
        "IsEndOfLine": lineending,
        "ContentType": 0,
        "StartTimeTolerance": 4,
        "EndTimeTolerance": 4,
        "SemitoneTolerance": 5
    })
}

for (i = 0; i < jsonPar.pictos.length; i++) {
    jsonPar.pictos[i].duration = jsonPar.pictos[i].duration / division;
    jsonPar.pictos[i].duration = Math.floor(jsonPar.pictos[i].duration);
    jsonPar.pictos[i].time = (jsonPar.pictos[i].time - jsonPar.videoOffset) / division;
    jsonPar.pictos[i].time = Math.floor(jsonPar.pictos[i].time);

    jsonPar.pictos[i]["__class"] = "PictogramClip";
    jsonPar.pictos[i]["Id"] = i + 1;
    jsonPar.pictos[i]["TrackId"] = 0;
    jsonPar.pictos[i]["IsActive"] = 1;
    jsonPar.pictos[i]["StartTime"] = jsonPar.pictos[i].time;
    var duration = jsonPar.pictos[i].duration;
    var time = jsonPar.pictos[i].time;
    var path = `world/maps/` + jsonPar.MapName.toLowerCase() + `/timeline/pictos/` + jsonPar.pictos[i].name + `.tga`;
    delete jsonPar.pictos[i]["duration"];
    jsonPar.pictos[i]["Duration"] = duration;
    jsonPar.pictos[i]["PictoPath"] = `world/maps/` + "output/" + jsonPar.MapName + "/" + jsonPar.MapName.toLowerCase() + `/timeline/pictos/` + jsonPar.pictos[i].name + `.tga`;
    jsonPar.pictos[i]["IsEndOfLine"] = jsonPar.pictos[i].isLineEnding;
    jsonPar.pictos[i]["MontagePath"] = "";
    jsonPar.pictos[i]["AtlIndex"] = 4294967295
    jsonPar.pictos[i]["CoachCount"] = 4294967295;
    delete jsonPar.pictos[i]["name"]
    delete jsonPar.pictos[i]["time"];
    dtape.Clips.push({
        "__class": "PictogramClip",
        "Id": i + 1,
        "TrackId": 2,
        "IsActive": 1,
        "StartTime": time,
        "Duration": duration,
        "PictoPath": path,
        "MontagePath": "",
        "AtlIndex": 4294967295,
        "CoachCount": 4294967295
    })
}

let ktapeFinal = JSON.stringify(ktape);
fsPath.writeFile("output/" + jsonPar.MapName + "/" + jsonPar.MapName.toLowerCase() + "_tml_karaoke.ktape.ckd", ktapeFinal, function(err) {
    if (err) {
        console.log(err);
    }
});

let goldEffectId = jsonPar.pictos.length + movesPar.length + movesP2par.length + movesP3par.length + movesP4par.length + 1;
for (i = 0; i < movesPar.length; i++) {
    movesPar[i].duration = movesPar[i].duration / division;
    movesPar[i].duration = Math.floor(movesPar[i].duration);
    Math.round(movesPar[i].duration);
    movesPar[i].time = (movesPar[i].time - jsonPar.videoOffset) / division;
    movesPar[i].time = Math.floor(movesPar[i].time);
    Math.round(movesPar[i].time);

    movesPar[i]["__class"] = "MotionClip";
    movesPar[i]["Id"] = i + jsonPar.pictos.length + 1;
    movesPar[i]["TrackId"] = 4;
    movesPar[i]["IsActive"] = 1;
    var duration = movesPar[i].duration;
    movesPar[i]["StartTime"] = movesPar[i].time;
    delete movesPar[i]["duration"];
    movesPar[i]["Duration"] = duration;
    movesPar[i]["ClassifierPath"] = `world/maps/` + jsonPar.MapName.toLowerCase() + `/timeline/moves/` + movesPar[i].name + `.msm`
    if (typeof movesPar[i].goldMove !== "undefined") movesPar[i]["GoldMove"] = movesPar[i].goldMove;
    else movesPar[i]["GoldMove"] = 0;
    movesPar[i]["Lyrics"] = movesPar[i].text;
    movesPar[i]["CoachId"] = 0;
    movesPar[i]["MoveType"] = 0;
    movesPar[i]["Color"] = [1, 0.637255, 0.325490, 0.625490];
    movesPar[i]["MotionPlatformSpecifics"] = {
        "X360": {
            "__class": "MotionPlatformSpecific",
            "ScoreScale": 1,
            "ScoreSmoothing": 0,
            "LowThreshold": 0,
            "HighThreshold": 1
        },
        "ORBIS": {
            "__class": "MotionPlatformSpecific",
            "ScoreScale": 1,
            "ScoreSmoothing": 0,
            "LowThreshold": 0,
            "HighThreshold": 1
        },
        "DURANGO": {
            "__class": "MotionPlatformSpecific",
            "ScoreScale": 1,
            "ScoreSmoothing": 0,
            "LowThreshold": 0,
            "HighThreshold": 1
        }
    }
    let name = movesPar[i].name;
    let ClassifierPath = `world/maps/` + jsonPar.MapName.toLowerCase() + `/timeline/moves/` + name + `.msm`;
    let time = movesPar[i].time;
    let id = i + jsonPar.pictos.length + 1;
    let goldenmove = movesPar[i].goldMove;
    dtape.Clips.push({
        "__class": "MotionClip",
        "Id": id,
        "TrackId": 0,
        "IsActive": 1,
        "StartTime": time,
        "Duration": duration,
        "ClassifierPath": ClassifierPath,
        "GoldMove": movesPar[i]["GoldMove"],
        "CoachId": 0,
        "MoveType": 0,
        "Color": [1, 0.988235, 0.670588, 0.870588],
        "MotionPlatformSpecifics": {
            "X360": {
                "__class": "MotionPlatformSpecific",
                "ScoreScale": 1,
                "ScoreSmoothing": 0,
                "ScoringMode": 0
            },
            "ORBIS": {
                "__class": "MotionPlatformSpecific",
                "ScoreScale": 1,
                "ScoreSmoothing": 0,
                "ScoringMode": 0
            },
            "DURANGO": {
                "__class": "MotionPlatformSpecific",
                "ScoreScale": 1,
                "ScoreSmoothing": 0,
                "ScoringMode": 0
            }
        }
    })
}

if (movesP2par.length === 0) {} else {
    for (i = 0; i < movesP2par.length; i++) {
        movesP2par[i].duration = movesP2par[i].duration / division;
        movesP2par[i].duration = Math.floor(movesP2par[i].duration);
        Math.round(movesP2par[i].duration);
        movesP2par[i].time = (movesP2par[i].time - jsonPar.videoOffset) / division;
        movesP2par[i].time = Math.floor(movesP2par[i].time);
        Math.round(movesP2par[i].time);
        movesP2par[i]["TrackId"] = 0;
        movesP2par[i]["IsActive"] = 1;
        var duration = movesP2par[i].duration;
        movesP2par[i]["StartTime"] = movesP2par[i].time;
        delete movesP2par[i]["duration"];
        movesP2par[i]["Duration"] = duration;
        movesP2par[i]["ClassifierPath"] = `world/maps/` + jsonPar.MapName.toLowerCase() + `/timeline/moves/` + movesP2par[i].name + `.msm`
        if (typeof movesP2par[i].goldMove !== "undefined") movesP2par[i]["GoldMove"] = movesP2par[i].goldMove;
        else movesP2par[i]["GoldMove"] = 0;
        let name = movesP2par[i].name;
        let ClassifierPath = `world/maps/` + jsonPar.MapName.toLowerCase() + `/timeline/moves/` + name + `.msm`;
        let time = movesP2par[i].time
        let id = i + jsonPar.pictos.length + movesPar.length + 1;
        let goldenmove = movesP2par[i].goldMove;
        dtape.Clips.push({
            "__class": "MotionClip",
            "Id": id,
            "TrackId": 0,
            "IsActive": 1,
            "StartTime": time,
            "Duration": duration,
            "ClassifierPath": ClassifierPath,
            "GoldMove": movesP2par[i]["GoldMove"],
            "CoachId": 1,
            "MoveType": 0,
            "Color": [1, 0.988235, 0.670588, 0.870588],
            "MotionPlatformSpecifics": {
                "X360": {
                    "__class": "MotionPlatformSpecific",
                    "ScoreScale": 1,
                    "ScoreSmoothing": 0,
                    "ScoringMode": 0
                },
                "ORBIS": {
                    "__class": "MotionPlatformSpecific",
                    "ScoreScale": 1,
                    "ScoreSmoothing": 0,
                    "ScoringMode": 0
                },
                "DURANGO": {
                    "__class": "MotionPlatformSpecific",
                    "ScoreScale": 1,
                    "ScoreSmoothing": 0,
                    "ScoringMode": 0
                }
            }
        })
    }
}


if (movesP3par.length === 0) {} else {
    for (i = 0; i < movesP3par.length; i++) {
        movesP3par[i].duration = movesP3par[i].duration / division;
        movesP3par[i].duration = Math.floor(movesP3par[i].duration);
        Math.round(movesP3par[i].duration);
        movesP3par[i].time = (movesP3par[i].time - jsonPar.videoOffset) / division;
        movesP3par[i].time = Math.floor(movesP3par[i].time);
        Math.round(movesP3par[i].time);
        movesP3par[i]["TrackId"] = 0;
        movesP3par[i]["IsActive"] = 1;
        var duration = movesP3par[i].duration;
        movesP3par[i]["StartTime"] = movesP3par[i].time;
        delete movesP3par[i]["duration"];
        movesP3par[i]["Duration"] = duration;
        movesP3par[i]["ClassifierPath"] = `world/maps/` + jsonPar.MapName.toLowerCase() + `/timeline/moves/` + movesP3par[i].name + `.msm`
        if (typeof movesP3par[i].goldMove !== "undefined") movesP3par[i]["GoldMove"] = movesP3par[i].goldMove;
        else movesP3par[i]["GoldMove"] = 0;
        let name = movesP3par[i].name;
        let ClassifierPath = `world/maps/` + jsonPar.MapName.toLowerCase() + `/timeline/moves/` + name + `.msm`;
        let time = movesP3par[i].time
        let id = i + jsonPar.pictos.length + movesPar.length+ movesP2par.length + 1;
        let goldenmove = movesP3par[i].goldMove;
        dtape.Clips.push({
            "__class": "MotionClip",
            "Id": id,
            "TrackId": 0,
            "IsActive": 1,
            "StartTime": time,
            "Duration": duration,
            "ClassifierPath": ClassifierPath,
            "GoldMove": movesP3par[i]["GoldMove"],
            "CoachId": 2,
            "MoveType": 0,
            "Color": [1, 0.988235, 0.670588, 0.870588],
            "MotionPlatformSpecifics": {
                "X360": {
                    "__class": "MotionPlatformSpecific",
                    "ScoreScale": 1,
                    "ScoreSmoothing": 0,
                    "ScoringMode": 0
                },
                "ORBIS": {
                    "__class": "MotionPlatformSpecific",
                    "ScoreScale": 1,
                    "ScoreSmoothing": 0,
                    "ScoringMode": 0
                },
                "DURANGO": {
                    "__class": "MotionPlatformSpecific",
                    "ScoreScale": 1,
                    "ScoreSmoothing": 0,
                    "ScoringMode": 0
                }
            }
        })
    }
}


if (movesP4par.length === 0) {} else {
    for (i = 0; i < movesP4par.length; i++) {
        movesP4par[i].duration = movesP4par[i].duration / division;
        movesP4par[i].duration = Math.floor(movesP4par[i].duration);
        Math.round(movesP4par[i].duration);
        movesP4par[i].time = (movesP4par[i].time - jsonPar.videoOffset) / division;
        movesP4par[i].time = Math.floor(movesP4par[i].time);
        Math.round(movesP4par[i].time);
        movesP4par[i]["TrackId"] = 0;
        movesP4par[i]["IsActive"] = 1;
        var duration = movesP4par[i].duration;
        movesP4par[i]["StartTime"] = movesP4par[i].time;
        delete movesP4par[i]["duration"];
        movesP4par[i]["Duration"] = duration;
        movesP4par[i]["ClassifierPath"] = `world/maps/` + jsonPar.MapName.toLowerCase() + `/timeline/moves/` + movesP4par[i].name + `.msm`
        if (typeof movesP4par[i].goldMove !== "undefined") movesP4par[i]["GoldMove"] = movesP4par[i].goldMove;
        else movesP4par[i]["GoldMove"] = 0;
        let name = movesP4par[i].name;
        let ClassifierPath = `world/maps/` + jsonPar.MapName.toLowerCase() + `/timeline/moves/` + name + `.msm`;
        let time = movesP4par[i].time
        let id = i + jsonPar.pictos.length + movesPar.length + movesP2par.length + movesP3par.length + 1;
        let goldenmove = movesP4par[i].goldMove;
        dtape.Clips.push({
            "__class": "MotionClip",
            "Id": id,
            "TrackId": 0,
            "IsActive": 1,
            "StartTime": time,
            "Duration": duration,
            "ClassifierPath": ClassifierPath,
            "GoldMove": movesP4par[i]["GoldMove"],
            "CoachId": 3,
            "MoveType": 0,
            "Color": [1, 0.988235, 0.670588, 0.870588],
            "MotionPlatformSpecifics": {
                "X360": {
                    "__class": "MotionPlatformSpecific",
                    "ScoreScale": 1,
                    "ScoreSmoothing": 0,
                    "ScoringMode": 0
                },
                "ORBIS": {
                    "__class": "MotionPlatformSpecific",
                    "ScoreScale": 1,
                    "ScoreSmoothing": 0,
                    "ScoringMode": 0
                },
                "DURANGO": {
                    "__class": "MotionPlatformSpecific",
                    "ScoreScale": 1,
                    "ScoreSmoothing": 0,
                    "ScoringMode": 0
                }
            }
        })
    }
}


if (gmsPar.length === 0) {} else {
    for (i = 0; i < gmsPar.length; i++) {
        gmsPar[i].StartTime = (gmsPar[i].StartTime - jsonPar.videoOffset) / division;
        gmsPar[i].StartTime = Math.floor(gmsPar[i].StartTime);
        let id = i + jsonPar.pictos.length + movesPar.length + movesP2par.length + movesP3par.length + movesP4par.length + 1;
        dtape.Clips.push({
                "__class": "GoldEffectClip",
                "Id": id,
                "TrackId": 0,
                "IsActive": 1,
                "StartTime": gmsPar[i].StartTime,
                "Duration": 24,
                "EffectType": gmsPar[i].EffectType
            });
    }
}

let dtapeFinal = JSON.stringify(dtape);
fsPath.writeFile("output/" + jsonPar.MapName + "/" + jsonPar.MapName.toLowerCase() + "_tml_dance.dtape.ckd", dtapeFinal, function(err) {
    if (err) {
        console.log(err);
    }
});

console.log("Title: " + jsonPar.Title);
console.log("Artist: " + jsonPar.Artist);
console.log("Using Division: " + division);