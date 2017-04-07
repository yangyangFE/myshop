var xmlHttp; 
let Response = {
	createxmlHttpRequest() { 
		if (window.ActiveXObject) { 
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); 
		} else if (window.XMLHttpRequest) { 
			xmlHttp=new XMLHttpRequest(); 
		} 
	},
	ajax(data){
		let url = "http://cloud.bmob.cn/cd09348818fe3303/test";
		this.createxmlHttpRequest(); 
		xmlHttp.open("POST",url); 
		xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
		xmlHttp.setRequestHeader("Access-Control-Allow-Origin", "*");
		xmlHttp.send(data); 
		xmlHttp.onreadystatechange = function() { 
			if ((xmlHttp.readyState == 4) && (xmlHttp.status == 200)) { 
				console.log(this.response); 
			} else { 
			alert('fail'); 
			} 
		} 
	} 
}
export default Response;