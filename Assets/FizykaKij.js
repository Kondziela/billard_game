#pragma strict

var isStrike = false;
var isBack = false;
var countStrike = 0;

function Start () {

}

function Update () {
	var szybkosc = Time.deltaTime * 100;
	var rotationVector = transform.rotation.eulerAngles;
	if(isStrike) {
		if(countStrike < 10) {
			transform.Translate(0, szybkosc, 0);
			countStrike++;
		} else {
			countStrike = 0;
			isStrike = false;
			isBack = true;
		}
	}
	if(isBack) {
		if(countStrike < 10) {
			transform.Translate(0, -szybkosc, 0);
			countStrike++;
		} else {
			countStrike = 0;
			isBack = false;
		}
	}
	// uderz
	if(Input.GetKeyDown(KeyCode.Mouse0)) {
		isStrike = true;
	}
	// position up
	if(Input.GetKey ("t")) {
		transform.Translate(szybkosc, 0, 0);
	}
	// position down
	if(Input.GetKey ("g")) {		
		transform.Translate(-szybkosc, 0, 0);
	}
	// position left
	if(Input.GetKey ("f")) {
		transform.Translate(0, 0, -szybkosc);
	}
	// position right
	if(Input.GetKey ("h")) {
		transform.Translate(0, 0, szybkosc);
	}
	// rotate up
	if(Input.GetKey ("i")) {
		rotationVector.x += 3;
		transform.rotation = Quaternion.Euler(rotationVector);
	}
	// rotate down
	if(Input.GetKey ("k")) {
		rotationVector.x -= 3;
		transform.rotation = Quaternion.Euler(rotationVector);	
	}
	// rotate left
	if(Input.GetKey ("j")) {
		rotationVector.z += 3;
		transform.rotation = Quaternion.Euler(rotationVector);	
	}
	// rotate right
	if(Input.GetKey ("l")) {
		rotationVector.z -= 3;
		transform.rotation = Quaternion.Euler(rotationVector);
	}
}