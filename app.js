var obj;
firebase.database().ref('/present').on('value',function(data){
document.getElementById("present").innerHTML=`Current Tasks : ${data.val()}`;
	})

firebase.database().ref('total').on('value',function(data){
	var a=data.val();
if(data.val()==null){
		firebase.database().ref('total').set(0);
}
if(data.val()==0){
	document.getElementById('format_data').disabled=true;
}else{
	document.getElementById('format_data').disabled=false;
}
document.getElementById('format_text').innerHTML=`you have total ${a} no. of tasks.`;
})


firebase.database().ref('overall').once('value',function(data){
		obj=data.val();
		for (const each in obj){
		var li=document.createElement("li");
		var span=document.createElement("span");
		var c=document.createTextNode(obj[each]);
		var del=document.createElement("button");
	var mod=document.createElement("button");
	del.appendChild(document.createTextNode("delete"));
	mod.appendChild(document.createTextNode("edit"));
	span.appendChild(document.createTextNode(obj[each]));
	li.appendChild(span);
	li.appendChild(c);
	li.appendChild(del);
	li.appendChild(mod);
	var ul=document.getElementById("ul");
	ul.appendChild(li);
	del.classList.add("del");
	mod.classList.add("mod");
	span.classList.add("hide");
	del.addEventListener("click",delfun);
	mod.addEventListener("click",modfun);
		}
})


function add(){
	
	firebase.database().ref('total').once('value',function(data){
	
	if(document.getElementById("input").value==""){
		alert("please insert something");
	}else{
		firebase.database().ref('/present').once('value',function(data){
			var pre=data.val();
			pre++;
			firebase.database().ref('/present').set(pre);
		})
		var totals;
		totals=data.val();
		totals++; 
		firebase.database().ref('total').set(totals);
		firebase.database().ref('overall/task' + totals).set(document.getElementById("input").value);
	var li=document.createElement("li");
	var span=document.createElement("span");
	var c=document.createTextNode(document.getElementById("input").value);
	var del=document.createElement("button");
	var mod=document.createElement("button");
	del.appendChild(document.createTextNode("delete"));
	mod.appendChild(document.createTextNode("edit"));
	span.appendChild(document.createTextNode(document.getElementById("input").value));
	li.appendChild(span);
	li.appendChild(c);
	li.appendChild(del);
	li.appendChild(mod);
	var ul=document.getElementById("ul");
	ul.appendChild(li);
	document.getElementById("input").value="";
	del.classList.add("del");
	mod.classList.add("mod");
	span.classList.add("hide");
	del.addEventListener("click",delfun);
	mod.addEventListener("click",modfun);
	document.getElementById('format_text').innerHTML=`you have total ${totals} no. of tasks.`

}
})
}
function delfun(){
	firebase.database().ref('/present').once('value',function(data){
		var pre=data.val();
		pre--;
		firebase.database().ref('/present').set(pre);
	})
	var del_finder=this.parentNode.childNodes[0].innerHTML;
	firebase.database().ref('overall').once('value',function(data){
		obj=data.val();
	for(const del in obj){
		if(obj[del]==del_finder){
			firebase.database().ref('overall/'+del).remove();		}
	}
	}	
	)
	this.parentNode.parentNode.removeChild(this.parentNode);	

}
	
function modfun(){
	firebase.database().ref('/present').once('value',function(data){
		var pre=data.val();
		pre--;
		firebase.database().ref('/present').set(pre);
	})
	document.getElementById("input").value=this.parentNode.childNodes[0].innerHTML;
	this.parentNode.parentNode.removeChild(this.parentNode);
	var mod_finder=this.parentNode.childNodes[0].innerHTML;
	firebase.database().ref('overall').on('value',function(data){
		obj=data.val();
	for(const del in obj){
		if(obj[del]==mod_finder){
			firebase.database().ref('overall/'+del).remove();		}
	}
	}	
	)
	
}
function format(){
	firebase.database().ref('/').remove();
	location.reload();
}