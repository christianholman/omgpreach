let emojis = ["👏", "👏🏻", "👏🏼", "👏🏽", "👏🏾", "👏🏿"]
let currEmoji = 0
let pageTitle = `O${emojis[currEmoji]}M${emojis[currEmoji]}G${emojis[currEmoji]} #preach` 
let maxChars = 280

document.getElementById("pagetitle").innerHTML = pageTitle

$(document).ready(function() {

	function preach(value) {
		preachSpace = [emojis[currEmoji]]
		
		let oldVal = value.trim().split(" ").reverse()
		let newVal = []
		
		currentSpace = 0
		for (var i = oldVal.length - 1; i >= 0; i--) {
			if(oldVal[i] != "") {
				if (currentSpace > preachSpace.length - 1) {currentSpace = 0}
					var tempVal = oldVal[i]
				if(!oldVal[i].startsWith("#")) {
					tempVal = tempVal + preachSpace[currentSpace]
				} else {
					tempVal = tempVal + " "
				}
				newVal.push(tempVal)
				currentSpace += 1
			}
		}
		return newVal.join("")
	}

	function getHashtags(value) {
		var words = value.trim().split(" ").reverse()
		var tags = []

		for (var i = words.length - 1; i >= 0; i--) {
			if(words[i].startsWith("#")) {
				tags.push(words[i].replace("#", ""))
			}
		}
		return tags	
	}

	function updatelinks() {
		$("#share_twitter").attr("href", "https://twitter.com/intent/tweet?hashtags=" + getHashtags($("#preachinput").val())+ "&text=" + preach($("#preachinput").val()))
	}

	$("#copytextbutton").click(function() {
		$temp = $("<input>")
		$("body").append($temp)
		$temp.val($("#output").val()).select()
		document.execCommand("copy")
		$temp.remove()
	})

	$("#emojibutton").click(function() {
		if(currEmoji == emojis.length - 1){
			currEmoji = 0
		} else {
			currEmoji++
		}
		$("#emojibutton").text(emojis[currEmoji])
		let pageTitle = `O${emojis[currEmoji]}M${emojis[currEmoji]}G${emojis[currEmoji]}prea.ch`
		document.getElementById("pagetitle").innerHTML = pageTitle
		$("#output").val(preach($("#preachinput").val()))
		updatelinks()

	})

	$("#preachinput").on('input', function(){
		let output = preach($(this).val())
		$("#output").val(output)
		updatelinks()
		$("#charcount").text(output.length > maxChars ? maxChars - output.length : output.length)
		$("#charcount").toggleClass("text-green", output.length <= maxChars)
		$("#charcount").toggleClass("text-red", output.length > maxChars)
	})
})