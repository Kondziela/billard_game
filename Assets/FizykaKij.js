#pragma strict

var isStrike = false;
var isBack = false;
var countStrike = 0;

function Update () {
	var multiplier = 3;	// previously - 10

	var szybkosc = Time.deltaTime * multiplier;
	var rotationVector = transform.rotation.eulerAngles;
	var rotVec = [rotationVector.x, rotationVector.y, rotationVector.z];
	Debug.Log("Rotation: " + rotVec[0] + rotVec[1] + rotVec[2]);
	Debug.Log("Position: " + transform.position.ToString());
	if(isStrike) {
		if(countStrike < 10) {
			transform.Translate(0, szybkosc*multiplier, 0);
			countStrike++;
		} else {
			countStrike = 0;
			isStrike = false;
			isBack = true;
		}
	}
	if(isBack) {
		if(countStrike < 10) {
			transform.Translate(0, -szybkosc*multiplier, 0);
			countStrike++;
		} else {
			countStrike = 0;
			isBack = false;
		}
	}
	// uderz
	if(Input.GetKeyDown(KeyCode.Mouse0)) {
		if(!isStrike && !isBack) {
			isStrike = true;
		}
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
		if(rotationVector.z > 93) {
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

/*function mnozMacierz31(A: float[,], V: float[]) : float[]
{
	var vec = new float[3];
	vec[0] = A[0,0]*V[0] + A[0,1]*V[1] + A[0,2]*V[2];
	vec[1] = A[1,0]*V[0] + A[1,1]*V[1] + A[1,2]*V[2];
	vec[2] = A[2,0]*V[0] + A[2,1]*V[1] + A[2,2]*V[2];
	return vec;
}

function mnozMacierze33(A: float[,], B: float[,]) : float[,]
{
	var table = new float[3,3];
	table[0,0] = A[0,0]*B[0,0] + A[0,1]*B[1,0] + A[0,2]*B[2,0];
	table[0,1] = A[0,0]*B[0,1] + A[0,1]*B[1,1] + A[0,2]*B[2,1];
	table[0,2] = A[0,0]*B[0,2] + A[0,1]*B[1,2] + A[0,2]*B[2,2];
	table[1,0] = A[1,0]*B[0,0] + A[1,1]*B[1,0] + A[1,2]*B[2,0];
	table[1,1] = A[1,0]*B[0,1] + A[1,1]*B[1,1] + A[1,2]*B[2,1];
	table[1,2] = A[1,0]*B[0,2] + A[1,1]*B[1,2] + A[1,2]*B[2,2];
	table[2,0] = A[2,0]*B[0,0] + A[2,1]*B[1,0] + A[2,2]*B[2,0];
	table[2,1] = A[2,0]*B[0,1] + A[2,1]*B[1,1] + A[2,2]*B[2,1];
	table[2,2] = A[2,0]*B[0,2] + A[2,1]*B[1,2] + A[2,2]*B[2,2];
	return table;
}

function macierzObrotuX(alfa: float) : float[,]
{
	var A = new float[3,3];
	A[0,0] = 1.0;
	A[0,1] = 0;
	A[0,2] = 0;
	A[1,0] = 0;
	A[1,1] = Mathf.Cos(Mathf.Deg2Rad*alfa);
	A[1,2] = -Mathf.Sin(Mathf.Deg2Rad*alfa);
	A[2,0] = 0;
	A[2,1] = Mathf.Sin(Mathf.Deg2Rad*alfa);
	A[2,2] = Mathf.Cos(Mathf.Deg2Rad*alfa);
	return A; 
}

function macierzObrotuY(alfa: float) : float[,]
{
	var B = new float[3,3];
	B[0,0] = Mathf.Cos(Mathf.Deg2Rad*alfa);
	B[0,1] = 0;
	B[0,2] = Mathf.Sin(Mathf.Deg2Rad*alfa);
	B[1,0] = 0;
	B[1,1] = 1;
	B[1,2] = 0;
	B[2,0] = -Mathf.Sin(Mathf.Deg2Rad*alfa);
	B[2,1] = 0;
	B[2,2] = Mathf.Cos(Mathf.Deg2Rad*alfa);
	return B;
}

function macierzObrotuZ(alfa: float) : float[,]
{
	var C = new float[3,3];
	C[0,0] = Mathf.Cos(Mathf.Deg2Rad*alfa);
	C[0,0] = -Mathf.Sin(Mathf.Deg2Rad*alfa);
	C[0,0] = 0;
	C[0,0] = Mathf.Sin(Mathf.Deg2Rad*alfa);
	C[0,0] = Mathf.Cos(Mathf.Deg2Rad*alfa);
	C[0,0] = 0;
	C[0,0] = 0;
	C[0,0] = 0;
	C[0,0] = 1;
	return C;
}

function przemiescOWektor(V: float[], rot: float[]) : Vector3
{
	var macierzObrX = macierzObrotuX(rot[0]);
	var macierzObrY = macierzObrotuY(rot[1]);
	var macierzObrZ = macierzObrotuZ(rot[2]);
	var retVec = mnozMacierz31(mnozMacierze33(mnozMacierze33(macierzObrZ, macierzObrY), macierzObrX), V);
	return new Vector3(retVec[0], retVec[1], retVec[2]);
}*/