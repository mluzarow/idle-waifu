class DialogChunk {
	constructor (characterID, characterText) {
		this.characterID = characterID;
		this.characterText = characterText;
		
		// this.ciCharacter= -1;
		// this.ciLine = -1;
		this.ciSection = -1;
	}
	
	getCharacterName () {
		return (this.characterID);
	}
	
	getCharacterText () {
		return (this.characterText);
	}
	
	getNextSection () {
		// If there exists a next section, get it
		if (this.characterText.length > (this.ciSection + 1)) {
			this.ciSection += 1;
			return (this.characterText[this.ciSection]);
		} else {
			// No more sections
			return (null);
		}
	}
	
	// feedNextCharacter () {
	// 	// Check if next character exists
	// 	if (this.characterText[this.ciSection][this.ciLine].length > (this.ciCharacter + 1)) {
	// 		this.ciCharacter += 1;
	// 	// No more characters; check if next line exists
	// 	} else if (this.characterText[this.ciSection].length > (this.ciLine + 1)) {
	// 		return (-1);
	// 	// No more lines; check if next section exists
	// 	} else if (this.characterText.length > (this.ciSection + 1)) {
	// 		return (-2);
	// 	// No more dialog
	// 	} else {
	// 		return (-3);
	// 	}
	// 
	// 	return (this.characterText[this.ciSection][this.ciLine][this.ciCharacter]);
	// }
	
	// slotNextLine () {
	// 	this.ciLine += 1;
	// }
	// 
	// slotNextSection () {
	// 	this.ciSection += 1;
	// }
}