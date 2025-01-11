var scene,
  camera,
  renderer,
  clock,
  mixer,
  actions,
  loader,
  object,
  globalObject;

init();


function init() {
  clock = new THREE.Clock();

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x005c89);

  camera = new THREE.PerspectiveCamera(90, 1, 0.1, 1000);
  //camera.position.set(0, 1.6,1);
  camera.position.y = 1.15;
  camera.position.z = 2.2;

  const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 1.5);
  light.position.set(0, 1, 10);
  scene.add(light);

  const light2 = new THREE.DirectionalLight(0xffffff, 1);
  light2.position.set(10, 5, 10);
  sceneSurface = document.getElementById("canvas");
  renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  const element = document.getElementById("canvas-wrapper");
  parent_height = element.offsetHeight;
  var parent_width = element.offsetWidth;

  if (window.innerWidth <= 544) {
    width = window.innerWidth;
    height = window.innerHeight;
    // update camera aspect
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    // update renderer
    renderer.setSize(width, height);
    renderer.setSize(parent_width + 100, parent_height + 100);
  } else {
    renderer.setSize(parent_width, parent_height);
  }

  sceneSurface.appendChild(renderer.domElement);
  const controls = new THREE.OrbitControls(camera, sceneSurface);
  controls.target.set(0, 0, 0.2);
  controls.update();
  loader = new THREE.GLTFLoader();
  loader.load("gltf/waveGltf.gltf", (object) => {
  globalObject = object;

  mixer = new THREE.AnimationMixer(object.scene);
  const action = mixer.clipAction(object.animations[0]);
  action.play();

  if (window.innerWidth <= 544) {
    object.scene.scale.set(0.009, 0.007, 0.007);
    object.scene.position.y = 0;
    object.scene.position.x = 0;
    object.scene.position.z = 1.3;
  } else {
    object.scene.scale.set(0.005, 0.0068, 0.007);
    object.scene.position.y = 0;
    object.scene.position.x = 0;
    object.scene.position.z = 1.5;
    }

    scene.add(object.scene);
    update();
  });
}


window.addEventListener("resize", () => {
  // update display width and height
  width = window.innerWidth;
  height = window.innerHeight;
  // update camera aspect
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  // update renderer
  renderer.setSize(width, height);
  var element2 = document.getElementById("canvas-wrapper");
  parent_height = element2.offsetHeight;
  parent_width = element2.offsetWidth;
  renderer.setSize(parent_width, parent_height);

  if (window.innerWidth <= 544) {
    width = window.innerWidth;
    height = window.innerHeight;
    // update camera aspect
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(parent_width + 100, parent_height + 100);
    object.scene.scale.set(0.009, 0.007, 0.007);
    object.scene.position.y = 0;
    object.scene.position.x = 0;
    object.scene.position.z = 1.3;
  }
  renderer.render(scene, camera);
  globalObject.scene.scale.set(0.009, 0.007, 0.007);
});


function playAction(index) {
  const action = actions[index];
  mixer.stopAllAction();
  action.reset();
  action.fadeIn(0.5);
  action.play();
}


function update() {
  requestAnimationFrame(update);
  renderer.render(scene, camera);
  const dt = clock.getDelta();
  mixer.update(dt);
}


function changeDiv(buttonId) {
  document.getElementById("container3-leadership").style.display = "none";
  document.getElementById("container3-programming").style.display = "none";
  document.getElementById("container3-design").style.display = "none";
  document.getElementById("container3-other").style.display = "none";

  const buttons = document.querySelectorAll(".button-list");
  buttons.forEach((button) => button.classList.remove("clicked-skills-button"));

  if (buttonId == "Leadership") {
    document.getElementById("container3-leadership").style.display = "grid";
    document.getElementById("leadership-button-list").classList.add("clicked-skills-button");
  }
  if (buttonId == "Programming") {
    document.getElementById("container3-programming").style.display = "grid";
    document.getElementById("programming-button-list").classList.add("clicked-skills-button");
  }
  if (buttonId == "Designing") {
    document.getElementById("container3-design").style.display = "grid";
    document.getElementById("skills-button-list").classList.add("clicked-skills-button");
  }
  if (buttonId == "Other") {
    document.getElementById("container3-other").style.display = "grid";
    document.getElementById("other-button-list").classList.add("clicked-skills-button");
  }
}


function displayCheck(selectValue) {
  const ProjectItems = document.querySelectorAll(".project-item ");
  ProjectItems.forEach((projectItem) => {
    projectItem.style.display = "none";
  });
  if (selectValue == "software-packages") {
    const softwarePackageProjectItems =
      document.querySelectorAll(".software-packages");
    softwarePackageProjectItems.forEach((projectItem) => {
      projectItem.style.display = "grid";
    });
  }
  if (selectValue == "websites") {
    const softwarePackageProjectItems = document.querySelectorAll(".websites");
    softwarePackageProjectItems.forEach((projectItem) => {
      projectItem.style.display = "grid";
    });
  }
  if (selectValue == "apps") {
    const softwarePackageProjectItems = document.querySelectorAll(".apps");
    softwarePackageProjectItems.forEach((projectItem) => {
      projectItem.style.display = "grid";
    });
  }
  if (selectValue == "machine-learning") {
    const softwarePackageProjectItems =
      document.querySelectorAll(".machine-learning");
    softwarePackageProjectItems.forEach((projectItem) => {
      projectItem.style.display = "grid";
    });
  }
  if (selectValue == "none") {
    const softwarePackageProjectItems =
      document.querySelectorAll(".coding-project");
    softwarePackageProjectItems.forEach((projectItem) => {
      projectItem.style.display = "grid";
    });
  }
}


document
  .querySelector("#project-type-wrapper")
  .addEventListener("change", function (e) {
    const allProjects = document.querySelectorAll(".project-item");

    const projectRadioButtons = document.querySelectorAll(
      'input[name="projects"]'
    );
    for (const projectRadioButton of projectRadioButtons) {
      if (
        projectRadioButton.value == "code-projects" &&
        projectRadioButton.checked == true
      ) {
        allProjects.forEach((projectItem) => {
          projectItem.style.display = "none";
        });

        const codingProjects = document.querySelectorAll(".coding-project");

        codingProjects.forEach((projectItem) => {
          projectItem.style.display = "grid";
        });

        document.getElementById("coding-projects-list-form").style.display =
          "block";
        console.log("it got in");
      } else if (
        projectRadioButton.value == "code-projects" &&
        projectRadioButton.checked == false
      ) {
        document.getElementById("coding-projects-list-form").style.display =
          "none";
      }

      if (
        projectRadioButton.value == "design-projects" &&
        projectRadioButton.checked == true
      ) {
        allProjects.forEach((projectItem) => {
          projectItem.style.display = "none";
        });

        const designProjects = document.querySelectorAll(".designs");

        designProjects.forEach((projectItem) => {
          projectItem.style.display = "grid";
        });
      } else if (
        projectRadioButton.value == "honors-projects" &&
        projectRadioButton.checked == true
      ) {
        allProjects.forEach((projectItem) => {
          projectItem.style.display = "none";
        });

        const honorsProjects = document.querySelectorAll(".honors");

        honorsProjects.forEach((projectItem) => {
          projectItem.style.display = "grid";
        });
      } else if (
        projectRadioButton.value == "all-projects" &&
        projectRadioButton.checked == true
      ) {
        allProjects.forEach((projectItem) => {
          projectItem.style.display = "none";
        });

        allProjects.forEach((projectItem) => {
          projectItem.style.display = "grid";
        });
      }
    }
  });


let checkbox = document.querySelector('input[name="hamburger-toggle"]');
checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    const menu_list = document.querySelector("#hamburger-menu-div");
    menu_list.style.display = "grid";
  } else {
    const menu_list = document.querySelector("#hamburger-menu-div");
    menu_list.style.display = "none";
  }

  console.log("checjbox value" + checkbox.checked);
});


addEventListener("resize", (event) => {
  if (window.innerWidth >= 1150) {
    if (checkbox.checked) {
      let menu_list = document.querySelector("#hamburger-menu-div");
      menu_list.style.display = "none";
      checkbox.checked = false;
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const hint = document.querySelector('.interaction-hint');
  
  // Hide hint after first interaction
  const hideHint = () => {
    hint.style.animation = 'none';
    hint.style.opacity = '0';
  };

  document.addEventListener('mousedown', hideHint, { once: true });
  document.addEventListener('keydown', (e) => {
    if (e.key.includes('Arrow')) {
      hideHint();
    }
  }, { once: true });
});