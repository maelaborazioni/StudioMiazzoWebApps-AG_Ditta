/**
 * @properties={typeid:24,uuid:"EFCCD321-3F26-47F1-8EA9-2FECA9ACF5EC"}
 */
function setScadenzaFormazione(enabled)
{
	elements.lbl_scadenzaformazione.enabled = enabled;
	elements.fld_scadenzaformazione.enabled = enabled;
	elements.btn_scadenzaformazione.enabled = enabled;
}

/**
 * @properties={typeid:24,uuid:"083CB213-0509-4DA7-9FB0-D7B2A241323D"}
 */
function gotoEdit()
{
	setScadenzaFormazione(codtipofunzione !== globals.codDATORELAVORO);
}
