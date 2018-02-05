/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"DCCCDF3C-A51E-4AF8-B121-749158659BB0"}
 */
function onActionBtnInfo(event) 
{
	var form = forms.agd_pri_documento_dtl.controller.getName();
	globals.ma_utl_showFormInDialog(form, 'Dettagli documento: ' + privacy_datigenerali_to_tabprivacytipodocumento.descrizione, foundset);
}
