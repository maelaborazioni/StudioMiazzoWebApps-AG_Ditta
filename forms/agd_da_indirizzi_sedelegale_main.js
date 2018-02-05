/**
 * @properties={typeid:24,uuid:"F468D19E-7120-479A-8F3E-66B207681B73"}
 */
function filterData(fs)
{
	_super.filterData(ditte_to_ditte_sedi_sedelegale && ditte_to_ditte_sedi_sedelegale.ditte_sedi_to_ditte_indirizzi);
}

/**
 * @properties={typeid:24,uuid:"7BE57ADE-1EC6-4397-8540-A465F1BAE67D"}
 */
function unfilterData(fs)
{
	_super.unfilterData(ditte_to_ditte_sedi_sedelegale && ditte_to_ditte_sedi_sedelegale.ditte_sedi_to_ditte_indirizzi);
}

/**
 * @properties={typeid:24,uuid:"9E7CFFB1-325A-4231-86F5-1E56C93E05C0"}
 */
function getEditFoundset()
{
	return ditte_to_ditte_sedi_sedelegale && ditte_to_ditte_sedi_sedelegale.ditte_sedi_to_ditte_indirizzi;
}

/**
 * @properties={typeid:24,uuid:"4FD8FDE2-9CB8-4B48-AE9D-2F370706E1D1"}
 */
function getButtonObject()
{
	var _enabled = globals.getTipologiaDitta(idditta) == globals.Tipologia.ESTERNA
	               || globals.ma_utl_hasKey(globals.Key.GEST_ANAG_DITTA);
	
	var btnObj = _super.getButtonObject();
	
		btnObj.btn_new = { enabled: _enabled };
		btnObj.btn_edit = { enabled: _enabled };
		btnObj.btn_delete = { enabled: _enabled };
		btnObj.btn_duplicate = { enabled: false };
		
	return btnObj;
}
/**
*
* @param {JSEvent} _event
* @param {String} _triggerForm
* @param {String} _forceForm
*
* @properties={typeid:24,uuid:"1F26026D-4AC9-4C60-B37C-89B7C1E9558B"}
*/
function dc_new(_event, _triggerForm, _forceForm) 
{
	var frm = forms.agd_indirizzo_edit;
	frm._isInEdit = false;
	frm._codTipoIndirizzo = globals.TipiIndirizzoDitta.SEDE_LEGALE;
	globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci un nuovo indirizzo per la sede legale');
}

/**
*
* @param event
* @param triggerForm
* @param forceForm
*
* @properties={typeid:24,uuid:"508B86B9-2ABE-43C5-A14B-0D394EB81F1C"}
*/
function dc_edit(event, triggerForm, forceForm)
{
	var frm = forms.agd_indirizzo_edit;
	frm._isInEdit = true;
	frm._idIndEdit = ditte_to_ditte_indirizzi.iddittaindirizzo;
	frm._codTipoIndirizzo = globals.TipiIndirizzoDitta.SEDE_LEGALE;
	globals.ma_utl_showFormInDialog(frm.controller.getName(),'Modifica l\'indirizzo per la sede legale');
}
