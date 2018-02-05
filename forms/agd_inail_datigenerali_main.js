/**
 *
 * @param {JSEvent} _event
 * @param {String} _triggerForm
 * @param {String} _forceForm
 *
 * @properties={typeid:24,uuid:"F31397A6-0593-403A-A91F-C88DE41C50D4"}
 */
function dc_new(_event, _triggerForm, _forceForm) 
{
	if(foundset.ditte_to_ditte_inailgenerale && foundset.ditte_to_ditte_inailgenerale.getSize())
	{
		var frm = forms.agd_inail_posizione_dtl_edit;
		frm._isInEdit = false;
		globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci una nuova posizione INAIL');
	}
	else
	{
		var frmInail = forms.agd_inail_dati_generali_dtl_edit;
	    globals.ma_utl_showFormInDialog(frmInail.controller.getName(),'Inserisci una nuova sede INAIL'); 
	}
}

/**
*
* @param event
* @param triggerForm
* @param forceForm
*
* @properties={typeid:24,uuid:"56479B23-FBA2-4144-B2EF-CCEC29D40F06"}
*/
function dc_edit(event, triggerForm, forceForm) 
{
	if(foundset.ditte_to_ditte_inailgenerale && foundset.ditte_to_ditte_inailgenerale.getSize())
	{
		var frm = forms.agd_inail_posizione_dtl_edit;
        frm._isInEdit = true;
        frm._idInailPos = foundset.ditte_to_ditte_inailposizioni.iddittainailposizione;
		globals.ma_utl_showFormInDialog(frm.controller.getName(),'Modifica la posizione INAIL');
	}
}

/**
*
* @param {JSEvent} _event
* @param {String} _triggerForm
* @param {String} _forceForm
* @param {Boolean} _noConfirm
*
* @properties={typeid:24,uuid:"0B800AB3-719B-4ED7-9F89-925D798BADE6"}
*/
function dc_delete(_event, _triggerForm, _forceForm, _noConfirm) 
{
	return ditte_to_ditte_inailposizioni.deleteRecord();
}

