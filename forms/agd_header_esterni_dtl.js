
/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param _form
 *
 * @private
 *
 * @properties={typeid:24,uuid:"D6B3D811-1CB5-4BF7-8A45-F0C3ECF92149"}
 */
function onRecordSelection(event, _form) 
{
	_super.onRecordSelection(event, _form);
	var selTabName = forms.svy_nav_fr_openTabs.vTabObjects[forms.svy_nav_fr_openTabs.vTabNames[forms.svy_nav_fr_openTabs.vSelectedTab]];
    if(selTabName && selTabName.program == 'AGD_Classificazioni_Esterna')
       globals.updateDatiGeneraliEsterni();
}
