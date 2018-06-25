
/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"5CD69DCB-C52C-40A0-83C2-DECDFD81ABF7"}
 * @AllowToRunInFind
 */
function onRecordSelection(event) 
{
	var frm = forms.agd_cl_dettaglio_esterni_tbl;
	var fs = frm.foundset;
	
	if(fs && fs.find())
	{
		fs.iddittaclassificazione = foundset.iddittaclassificazione;
		fs.search();
	}
}
