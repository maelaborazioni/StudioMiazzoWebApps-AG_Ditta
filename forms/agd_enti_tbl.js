/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param {String} _form
 *
 * @private
 *
 * @properties={typeid:24,uuid:"41296FCF-0453-47FE-85A7-608BB4AC76EB"}
 */
function onRecordSelection(event, _form)
{
   var frmWeb = forms.agd_enti_web;
   frmWeb.vCodiceAzienda = codiceazienda;
   frmWeb.vUsername = username;
   frmWeb.vPassword = password;

   var frmDtl = forms.agd_enti_dtl;
   frmDtl.vValidoDal = valido_dal_periodo;
   frmDtl.vValidoAl = valido_al_periodo;
   frmDtl.vNote = note;
}
