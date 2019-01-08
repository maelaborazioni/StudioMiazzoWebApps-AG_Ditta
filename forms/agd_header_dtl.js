/**
 * @properties={typeid:35,uuid:"4DC4566C-9797-44CF-A8B6-55BAB6198265",variableType:-4}
 */
var pkDitta;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"F76D3FAE-31F2-432E-9A76-4E1C3E95F1B7"}
 */
function onActionBtnDitta(event) 
{
	var method;
	switch(globals.getTipologiaDitta(idditta))
	{
		case 0 :
			method = 'filtraDittaStandard';
			break;
		case 1 :
			method = 'filtraDittaEsterne';
		case 2 : 
//			method = 'filtraDittaEsterna';
			break;
		case 3:
		    method = 'filtraDittaFornitori';
			break;
		case 4:
		    method = 'filtraDittaClienti';
			break;
		default:
		    globals.ma_utl_showWarningDialog('Nessuna ditta ancora inserita!');
			return;
		    break;
	}
    	
	pkDitta = null;
	pkDitta = globals.ma_utl_showLkpWindow({ event: event
		                                     , lookup: 'AG_Lkp_Ditta'
		                                     , returnField: 'pkDitta'
		                                     , methodToAddFoundsetFilter : method
		                                     , allowInBrowse: true });
	if(pkDitta)
		globals.lookupFoundset(pkDitta, foundset);
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param _form
 *
 * @properties={typeid:24,uuid:"7E260B27-FDF7-41B8-8CFA-F884A3264CB4"}
 */
function onRecordSelection(event, _form) 
{
	globals.vCurrentEmployerID = idditta;
	
	_super.onRecordSelection(event, _form);
	globals.disableFunzioni(ditte_to_sicurezza_datigenerali && ditte_to_sicurezza_datigenerali.datorenominato === 1);
	forms.agd_enti_tipologie.aggiornaTipologieEnti();
	
}

/**
 * @param {String} status
 *
 * @properties={typeid:24,uuid:"11535559-D726-45A3-BF8E-8BABF9CA6F1D"}
 */
function setStatus(status)
{
	var frm = forms.agd_header_dtl ;
	globals.ma_utl_setStatus(status,frm.controller.getName());	
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"CC76B848-2411-4273-A731-351C581B874A"}
 */
function apriPopUpDitta(event) {
	
	globals.apriPopupAnaDitta(event,idditta);
}

/** 
 * @param _event
 * @param _triggerForm
 *
 * @properties={typeid:24,uuid:"98F07EDB-BF78-49FE-A751-AFCB39CEF96D"}
 */
function dc_new(_event, _triggerForm)
{
	if(globals.getTipologiaDitta(idditta) == globals.Tipologia.ESTERNA)
	{	
		var frmEst = forms.agd_ditta_esterna;
		globals.ma_utl_showFormInDialog(frmEst.controller.getName(),'Inserisci una nuova anagrafica ditta esterna');
	}
	else
	{
		var frm = forms.agd_ditta;
		globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci una nuova anagrafica ditta');
	}
		
}

/**
*
* @param {JSEvent} _event
* @param {String} _triggerForm
* @param {String} _forceForm
*
* @properties={typeid:24,uuid:"DAFC4C84-258B-4E65-A9D7-E17EC960A97F"}
*/
function dc_edit(_event, _triggerForm, _forceForm)
{
	return _super.dc_edit(_event, _triggerForm, _forceForm)
}

/**
*
* @param {JSEvent} _event
* @param {String} _triggerForm
* @param {String} _forceForm
* @param {Boolean} _noConfirm
*
* @properties={typeid:24,uuid:"6430E796-96C8-4089-B8BC-3EB9EDC17F7F"}
*/
function dc_delete(_event, _triggerForm, _forceForm, _noConfirm)
{
	return _super.dc_delete(_event, _triggerForm, _forceForm, _noConfirm)
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 * @override
 *
 * @properties={typeid:24,uuid:"3CDC0B55-DCDB-4E64-B113-3782A5E40322"}
 */
function onShowForm(firstShow, event) 
{
	_super.onShowForm(firstShow, event);
		
	elements.fld_tipologia_esterna.visible =
		elements.lbl_tipologia_esterna.visible =
			elements.fld_codice_legata.visible =
				elements.lbl_codice_legata.visible = (tipologia == 1);
	
}
