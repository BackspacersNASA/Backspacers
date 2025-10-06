const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById("optionButtons")

let state= {};

function startOptions(){
    showStepText(1)
}

function showStepText(stepTextIndex){  

    const stepText = stepTexts.find(stepText => stepText.id === stepTextIndex)
    textElement.innerText =  stepText.text
    
    while (optionButtonsElement.firstChild){
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }

    stepText.options.forEach(option => {
        if(showOption(option)){
            const button = document.createElement("button");
            button.innerText = option.text;
            button.addEventListener("click", () => selectOption(option)) 
            optionButtonsElement.appendChild(button);
        }
    })

    document.querySelectorAll("#cinematics video").forEach(video => {
        video.pause();
        video.currentTime = 0;
        video.style.display = "none";
    });

    if (stepText.cinematic) {
        const video = document.getElementById(stepText.cinematic);
        if (video) {
            video.style.display = "block";
            video.play();
        }
    }

}

function closePopup() {
    const popups = document.querySelectorAll("#popups p");
    popups.forEach(p => p.style.display = "none");
    document.getElementById("closeButton").style.display="none"
    document.getElementById("popups").style.display="none"
    
}


function showOption(){
    return true;
}

function selectOption(option) {

    const allPopups = document.querySelectorAll("#popups p");
    allPopups.forEach(p => p.style.display = "none");


    if (option.popup) {
        document.getElementById("popups").style.display="block"
        document.getElementById("closeButton").style.display="block"
        const popup = document.getElementById(option.popup);
        if (popup) {
            popup.style.display = "block";
        }
    }

    if (option.nextText != null && option.nextText > 0) {
        closePopup();
        showStepText(option.nextText);
    } else if (option.nextText <= 0) {
        closePopup(); 
        startOptions();
    }
    
    const nextStepTextId = option.nextText
    if (nextStepTextId <= 0) {
    return startOptions()
  }
    showStepText(nextStepTextId)

}

const stepTexts = [ 
    {
        id: 1,
        text: "What are you gonna do about this situation?",
        options: [
            {
                text: "Act \n Yes, I can do something to help.",
                nextText: 4,
            },
            {
                text: "Ignore it \n Nah, surely the government will take charge of it.",
                nextText: 18,
            },
            {
                text: "PANIC \n We are doomed, we are all going to DIE",
                nextText: 18,
            }
        ]
    },
    {
        id: 4,
        text: "You are at college. Your professor wants you to self-study. What are you studying?",
        options: [
            {
                text: "Possible effects of meteor impacts",
                nextText: 7
            },
            {
                text: "How the characteristics of a meteor are determined",
                nextText: 8
            },
            {
                text: "Some existing measures against meteors",
                nextText: 9
            },
            {
                text: "I think I'm done learning for now. I wanna go home.",
                nextText: 3
            }
        ],
        cinematic: 3
    },
    {
        id: 3,
        text: "The class finishes. You get home. What are you doing now?",
        options: [
            {
                text: "Reading the news",
                nextText: 5,
            },
            {
                text: "Looking up meteors near Earth using the NASA's Near Earth Object Web \n Service API",
                nextText: 6,
            },
            {
                text: "Maybe I should go back to school and study some more",
                nextText: 4,
            },
            {
                text: "Sleeping to go to school tomorrow.",
                nextText: 10,
            }
        ],
        cinematic: 2,
    },
    {
        id: 5,
        text: "You look up the news. You can pick a source.",
        options: [
            {
                text: "Source A",
                popup: "popup-A"
            
            },
            {
                text: "Source B",
                popup: "popup-B"
            },
            {
                text: "I wanna do someething else",
                nextText: 3
            }
        ]
    },
    {
        id: 6,
        text: "You use the NeoWs API to get the meteors with the closest miss distance to Earth.",
        options: [
            {
                text: "title-MA",
                popup: "popup-MA"
            },
            {
                text: "title-MB",
                popup: "popup-MB"
            },
            {
                text: "title-MC",
                popup: "popup-MC"
            },
            {
                text: "Use the NASA's Eyes on Asteroids to browse meteors in real time in an easier manner.",
                popup: "popup-EoA"
            },
            {
                text: "I'm done looking up meteors. I'll probably be able to look up to see one soon enough anyways...",
                nextText: 3
            }
        ]
    },
    {
        id: 7,
        text: "These are some of the possible effects of meteor impacts",
        options: [
            {
                text: "Seismic Activity",
                popup: "popup-Ac"
            },
            {
                text: "Tsunamis",
                popup: "popup-Ts"
            },
            {
                text: "Atmospheric changes",
                popup: "popup-Ch"
            },
            {
                text: "I'm done learning about this",
                nextText: 4
            }
            
        ]
    },
    {
        id: 8,
        text: "These are some characteristics of meteors",
        options: [
            {
                text: "Estimated diameter",
                popup: "popup-diameter"
            },
            {
                text: "Miss distance",
                popup: "popup-distance"
            },
            {
                text: "Close approach date",
                popup: "popup-date"
            },
            {
                text: "Relative velocity",
                popup: "popup-velocity"
            },
            {
                text: "I'm done learning about meteors",
                nextText: 4
            }
        ]
    },
    {
        id: 9,
        text: "These are some existing measures against meteors",
        options: [
            {
                text: "Spaceguard",
                popup: "popup-Spaceguard"
            },
            {
                text: "HAIV",
                popup: "popup-HAIV"
            },
            {
                text: "DART",
                popup: "popup-DART"
            },
            {
                text: "I'm done learning about this",
                nextText: 4
            }
        ]
    },
    {
        id: 10,
        text: "You wake up the next day and go to school to take another class. The professor mentions an internship program at the NASA.",
        options: [
            {
                text: "go back",
                nextText: 9,
            },
            {
                text: "Continue",
                nextText: 11,
            }
        ],
        cinematic: 3,
    },
    {
        id: 11,
        text: "Your studies give you ideas to stop the meteor. You decide to apply for an internship at the NASA.",
        options: [
            {
                text: "go back",
                nextText: 10,
            },
            {
                text: "Continue",
                nextText: 12,
            },
            
        ],
        cinematic: 3,
    },
    {
        id: 12,
        text: "You got in! You are now working at the NASA.",
        options: [
            {
                text: "continue",
                nextText: 13,
            }
        ],
        cinematic: 2,
    },
    {
        id: 13,
        text: "All this time, scientists have been monitoring possible menaces to Earth. We have 2 years until one strikes. \n Based on your research, which meteor is the greatest threat? ",
        cinematic: 8,
        options: [
            {
                text: "247517 (2002 QY6)",
                nextText: 21,
            },
            {
                text: "2020 GA2",
                nextText: 21,
            },
            {
                text: "Impact 2025",
                nextText: 14,
                setState: true,
            }
        ]
    },
    {
        id: 14,
        text: "Great. Now comes the plan to stop it. Through the years NASA has established many contingency plans for these cases, but now we are running out of time and budget so we can only use one of them and build whatever's necessary.",
        cinematic: 7,
        options: [
            {
                text: "Spaceguard",
                nextText: 20,
            },
            {
                text: "HAIV",
                nextText: 15,
            },
            {
                text: "DART",
                nextText: 20,
            }
        ]
    },
    {
        id: 15,
        text: "Building the HAIV...",
        cinematic: 4,
        options: [
            {
                text: "Continue",
                nextText: 16,
            }
        ]
    },
    {
        id: 16,
        text: "Building the HAIV has been a challenge. Now we have to predict the perfect moment to launch the rocket to ensure that it will hit the target. After some calculations, the rest of the team has proposed three options. \n When are we launching the HAIV?",
        options: [
            {
                text: "As soon as we have an acceptable rate of success",
                nextText: 17,
            },
            {
                text: "Once the meteor is closer and the accuracy is slightly more trustable",
                nextText: 19,
            },
            {
                text: "Wait for the meteor to be the closest to the Earth and ensure the impact",
                nextText: 19,
            }
        ]
    },
    {
        id: 17,
        text: "GOOD ENDING \n Well done, here's your medal",
        cinematic: 5,
        options: [
            {
                text:"Play again?",
                nextText: 1
            }
        ]
    },
    {
        id: 18,
        text: "BAD ENDING",
        cinematic: 6,
        options: [
            {
                text:"Retry",
                nextText: 1
            }
        ]
    },
    {
        id: 19,
        text: "Oh no! We should have tried for the operation to be as far from Earth as possible...",
        cinematic: 6,
        options: [
            {
                text:"Retry",
                nextText: 16 
            }
        ]
    },
    {
        id: 20,
        text: "Maybe that was not the correct method to stop the meteor...",
        cinematic: 6,
        options: [
            {
                text:"Retry",
                nextText: 14
            }
        ]
    },
    {
        id: 21,
        text: "Apparently that meteor was not the greatest threat...",
        cinematic: 6,
        options: [
            {
                text:"Retry",
                nextText: 13
            }
        ]
    },
] 


startOptions()