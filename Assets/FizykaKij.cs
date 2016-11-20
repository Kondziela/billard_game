using UnityEngine;
using System.Collections;

public class FizykaKij : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		float szybkosc = Time.deltaTime * 100;
		if(Input.GetKeyDown(KeyCode.Mouse0)) {
			transform.Translate(0, 0, szybkosc);
		}
	}
}
