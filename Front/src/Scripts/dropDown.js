window.onload = function() {
    // By default select the hard skills input
    // ? console.log("checked true") : document.getElementById("[hard-skills]")
    document.querySelector("[hard-skills]").checked = true;

    const dropdownMenu = document.getElementById('dropdownButton');
    const dropdownContent = document.getElementById('dropdownContent');

    dropdownMenu.addEventListener("click", function () {
        dropdownContent.classList.toggle('hidden');
    });

    const softSkills = document.getElementById('softSkills');
    const hardSkills = document.getElementById('hardSkills');

    const softSkillsContent = document.getElementById('softSkillsContent');
    const hardSkillsContent = document.getElementById('hardSkillsContent');


    softSkills.addEventListener("click", function () {
        console.log(softSkillsContent.classList[softSkillsContent.classList.length - 1]);
        if (softSkillsContent.classList[softSkillsContent.classList.length - 1] === "hidden") {
            hardSkillsContent.classList.remove('active');
            hardSkillsContent.classList.add('hidden');
            softSkillsContent.classList.remove('hidden');
            softSkillsContent.classList.add('active');
        }

        dropdownContent.classList.add('hidden');
    }
    );

    hardSkills.addEventListener("click", function () {
        if (hardSkillsContent.classList[hardSkillsContent.classList.length - 1] === "hidden") {
            softSkillsContent.classList.remove('active');
            softSkillsContent.classList.add('hidden');
            hardSkillsContent.classList.remove('hidden');
            hardSkillsContent.classList.add('active');
        }

        dropdownContent.classList.add('hidden');
    }
    );
}