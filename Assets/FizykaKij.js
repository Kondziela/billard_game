#pragma strict

var isStrike = false;
var isBack = false;
var countStrike = 0;

function Update () {
	var szybkosc = Time.deltaTime;
	var multiplier = 3;	// previously - 10

	//var szybkosc = Time.deltaTime * multiplier;
	var rotationVector = transform.rotation.eulerAngles;
	var rotVec = [rotationVector.x, rotationVector.y, rotationVector.z];
	//Debug.Log("Rotation: " + rotVec[0] + rotVec[1] + rotVec[2]);
	//Debug.Log("Position: " + transform.position.ToString());
	Debug.Log(Input.inputString);
	Debug.Log("AXES: " + Input.GetAxis("PS4_KLVer") + " " + Input.GetAxis("PS4_KlHor"));

	if(isStrike) {
		if(countStrike < 10) {
			transform.Translate(0, szybkosc*5, 0);
			countStrike++;
		} else {
			countStrike = 0;
			isStrike = false;
			isBack = true;
		}
	}
	if(isBack) {
		if(countStrike < 10) {
			transform.Translate(0, -szybkosc*5, 0);
			countStrike++;
		} else {
			countStrike = 0;
			isBack = false;
		}
	}
	// ##########################################
	// UDERZ
	// ##########################################
	
	// Myszka
	if(Input.GetKeyDown(KeyCode.Mouse0)) {
		if(!isStrike && !isBack) {
			isStrike = true;
		}
	}
	
	// PAD
	if(Input.GetKeyDown(KeyCode.JoystickButton1)) {
		if(!isStrike && !isBack) {
			isStrike = true;
		}
	}
	
	// #########################################
	// RUCH
	// #########################################
	
	// PAD
	transform.Translate(Input.GetAxis("PS4_KLVer") * szybkosc, 0, Input.GetAxis("PS4_KlHor") * szybkosc);
	
	// Klawiatura
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
	
	// ############################################
	// ROTATE
	// ############################################

	// PAD
	rotationVector.z -= 0.2*Input.GetAxis("PS4_PVer");
	rotationVector.y -= 0.2*Input.GetAxis("PS4_PHor");
	if(rotationVector.z < 91) {
		rotationVector.z += 0.2;
	}
	transform.rotation = Quaternion.Euler(rotationVector);
	
	// KLAWIATURA
	
	// rotate up
	if(Input.GetKey ("i")) {
		if(rotationVector.z > 91) {
			Debug.Log("Ponad 91 na z" + rotationVector.z);
			rotationVector.z -= 1;
			transform.rotation = Quaternion.Euler(rotationVector);
		}
	}
	// rotate down
	if(Input.GetKey ("k")) {
		rotationVector.z += 1;
		transform.rotation = Quaternion.Euler(rotationVector);	
	}
	// rotate left
	if(Input.GetKey ("j")) {
		rotationVector.y -= 1;
		transform.rotation = Quaternion.Euler(rotationVector);	
	}
	// rotate right
	if(Input.GetKey ("l")) {
		rotationVector.y += 1;
		transform.rotation = Quaternion.Euler(rotationVector);
	}
}
