const angle = 20;
const rotateCard = window;

const lerp = (start, end, amount) => {
	return (1 - amount) * start + amount * end;
};

const remap = (value, oldMax, newMax) => {
	const newValue = ((value + oldMax) * (newMax * 2)) / (oldMax * 2) - newMax;
	return Math.min(Math.max(newValue, -newMax), newMax);
};

window.addEventListener("DOMContentLoaded", (event) => {
	const cards = document.querySelectorAll(".display");
	cards.forEach((e) => {
		e.addEventListener("mousemove", (event) => {
			const rect = e.getBoundingClientRect();
			const centerX = (rect.left + rect.right) / 2;
			const centerY = (rect.top + rect.bottom) / 2;
			const posX = event.pageX - centerX;
			const posY = event.pageY - centerY;
			const x = remap(posX, rect.width / 2, angle);
			const y = remap(posY, rect.height / 2, angle);
			e.dataset.rotateX = x;
			e.dataset.rotateY = -y;
		});

		e.addEventListener("mouseout", (event) => {
			e.dataset.rotateX = 0;
			e.dataset.rotateY = 0;
		});
	});

	const update = () => {
		cards.forEach((e) => {
			let currentX = parseFloat(e.style.getPropertyValue('--rotateY').slice(0, -1));
			let currentY = parseFloat(e.style.getPropertyValue('--rotateX').slice(0, -1));
			if (isNaN(currentX)) currentX = 0;
			if (isNaN(currentY)) currentY = 0;
			const x = lerp(currentX, e.dataset.rotateX, 0.05);
			const y = lerp(currentY, e.dataset.rotateY, 0.05);
			e.style.setProperty("--rotateY", x + "deg");
			e.style.setProperty("--rotateX", y + "deg");
		})
	}
	setInterval (update,1000/60)
});

const learnDialog = document.getElementById("learn-dialog");
const hobbiesDialog = document.getElementById("hobbies-dialog");

learnDialog.addEventListener("click", function (event) {
  if (event.target !== learnDialog) {
    return;
  }
  console.log(event.target.tagName);
  if (
    event.offsetX < 0 ||
    event.offsetX > event.target.offsetWidth ||
    event.offsetY < 0 ||
    event.offsetY > event.target.offsetHeight
  ) {
    closeLearn();
  }
});

hobbiesDialog.addEventListener("click", function (event) {
	if (event.target !== hobbiesDialog) {
	  return;
	}
	console.log(event.target.tagName);
	if (
	  event.offsetX < 0 ||
	  event.offsetX > event.target.offsetWidth ||
	  event.offsetY < 0 ||
	  event.offsetY > event.target.offsetHeight
	) {
	  closeHobbies();
	}
  });
  
function showLearn() {
	learnDialog.style.clipPath = "unset";
	learnDialog.showModal();
	learnDialog.style.transform = "scale(1)";
}
function showHobbies() {
	hobbiesDialog.style.clipPath = "unset";
	hobbiesDialog.showModal();
	hobbiesDialog.style.transform = "scale(1)";
}

function closeLearn() {
  learnDialog.style.clipPath = "unset";
  learnDialog.style.transform = "scale(0)";
  learnDialog.close();
}
function closeHobbies() {
  hobbiesDialog.style.clipPath = "unset";
  hobbiesDialog.style.transform = "scale(0)";
  hobbiesDialog.close();
}