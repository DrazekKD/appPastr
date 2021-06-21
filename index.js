const startData = document.getElementById("startData")
const startTime = document.getElementById("startTime")
const stopData = document.getElementById("stopData")
const stopTime = document.getElementById("stopTime")
const startTemperature = document.getElementById("startTemperature")
const stopTemperature = document.getElementById("stopTemperature")
const generateBtton = document.getElementById("generate")
const dataText = document.getElementById("dataText")
const clean = document.getElementById("clean")


// Call block on each date from startDate to endDate, inclusive
function forEachDateInRange(startDate, endDate,startTime,stopTime) {
	const dates = []
	let index = 0
	for(let currentDate = new Date(startDate); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
		let dateValue = currentDate.toJSON().slice(0, 10).replaceAll("-",'/')
		let dataFormat = dateValue.split('/').reverse()
		dataFormat[2] =dataFormat[2].slice(-2)
		dataFormat = dataFormat.join('/')
		if (!index){
			index++
			dates.push(
				{
					date:dataFormat,
					time:getFirstTime(startTime)
				}
			)
		}else{
			index++
			dates.push(
				{
					date:dataFormat,
					time:getAllTime()
				}
			)

		}
	}
	dates[dates.length-1].time =getStopTime(stopTime)
	return dates
}


function getStopTime(startTime){
	let startValue = parseInt(startTime.split(':')[0])
	let firstDayTimes =[]
	let lengthTime = startValue.toString().length === 2
	const firstIndex = lengthTime?startValue+":"+startTime.split(':')[1]:"0"+startValue+":"+startTime.split(':')[1]
	firstDayTimes.push([firstIndex,generateRandomNumber(startTemperature.value,stopTemperature.value)])
	startValue--
	for(;startValue>=0;startValue--){
		let lengthTime = startValue.toString().length === 2
		let time =lengthTime?startValue+":00":"0"+startValue+":00"
		firstDayTimes.push([time,generateRandomNumber(startTemperature.value,stopTemperature.value)])
	}
	return firstDayTimes.reverse()
}


function getFirstTime(startTime){
	let startValue = parseInt(startTime.split(':')[0])
	let firstDayTimes =[]
	let lengthTime = startValue.toString().length === 2
	const firstIndex = lengthTime?startValue+":"+startTime.split(':')[1]:"0"+startValue+":"+startTime.split(':')[1]
	firstDayTimes.push([firstIndex,generateRandomNumber(startTemperature.value,stopTemperature.value)])
	startValue++
	for(;startValue<=24;startValue++){
		let lengthTime = startValue.toString().length === 2
		let time =lengthTime?startValue+":00":"0"+startValue+":00"
		firstDayTimes.push([time,generateRandomNumber(startTemperature.value,stopTemperature.value)])
	}
	return firstDayTimes
}

function getAllTime(){
	let firstDayTimes =[]
	for(let i = 0;i<=24;i++){
		let lengthTime = i.toString().length === 2
		let time =lengthTime?i+":00":"0"+i+":00"
		firstDayTimes.push([time,generateRandomNumber(startTemperature.value,stopTemperature.value)])
	}
	return firstDayTimes
}

function generateRandomNumber(min,max) {
	let highlightedNumber = Math.random() * (parseFloat(max) - parseFloat(min)) + parseFloat(min);

	return highlightedNumber.toFixed(1);
};

function CopyToClipboard(id)
{
	var r = document.createRange();
	r.selectNode(document.getElementById(id));
	window.getSelection().removeAllRanges();
	window.getSelection().addRange(r);
	document.execCommand('copy');
	window.getSelection().removeAllRanges();
}

if( typeof Element.prototype.clearChildren === 'undefined' ) {
	Object.defineProperty(Element.prototype, 'clearChildren', {
		configurable: true,
		enumerable: false,
		value: function() {
			while(this.firstChild) this.removeChild(this.lastChild);
		}
	});
}


clean.addEventListener('click',e=>{
	dataText.clearChildren()
})


generateBtton.addEventListener('click',event=>{
	let allDate =forEachDateInRange(new Date(startData.value), new Date(stopData.value),startTime.value,stopTime.value)
	allDate.forEach(data=>{
		data.time.forEach(dataValue=>{
			let text = data.date +"\t"+"\t"+"\t"+ "\t"+"\t"+"\t"+dataValue[0] +"\t"+"\t"+"\t"+dataValue[1]+"℃"
			var node = document.createElement("P");
			var textnode = document.createTextNode(text);
			node.appendChild(textnode);
			dataText.appendChild(node);
		})
	})

	CopyToClipboard('dataText')
})
