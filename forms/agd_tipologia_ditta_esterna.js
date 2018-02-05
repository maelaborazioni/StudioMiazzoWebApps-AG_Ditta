/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"E7C332DF-3B58-4D9F-BDD4-F92C14CA1F0E",variableType:4}
 */
var _tipologiaDitta = 0;
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"7DCD0CB3-BA99-4E1F-9566-212BF64F1CBE",variableType:4}
 */
var _chkImportaDaFile = 0;
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"7B7EE6BC-A6BB-438C-9B59-D5E8BBA074B8",variableType:4}
 */
var _chkInserisciManuale = 1;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"7C10135B-FDF1-45CA-859B-1D036CD188E5"}
 */
function onActionAnnullaTipologiaDitta(event)
{
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.svy_mod_closeForm(event);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"780C4202-1816-4AF7-92CA-97723244CDEF"}
 */
function onActionConfermaTipologiaDitta(event)
{
	var frmAnagrafica = _tipologiaDitta == 1 || _tipologiaDitta == 11 ? forms.agd_ditta_esterna : forms.agd_ditta_cliente;
	switch(_tipologiaDitta)
	{
		case 1:
		frmAnagrafica._tipologiaDitta = globals.Tipologia.ESTERNA;
		frmAnagrafica._tipoEsterni = 0;
		break;
		case 11:
		frmAnagrafica._tipologiaDitta = globals.Tipologia.ESTERNA;
		frmAnagrafica._tipoEsterni = 1;
		break;
		case 3:
		frmAnagrafica._tipologiaDitta = globals.Tipologia.FORNITORE;
		break;
		case 4:
		frmAnagrafica._tipologiaDitta = globals.Tipologia.CLIENTE;
		break;
		default:
		break;
	}
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.svy_mod_closeForm(event);
	
	globals.ma_utl_showFormInDialog(frmAnagrafica.controller.getName(),'Compila anagrafica ditta esterna');
}

/**
*
* @param {Boolean} _firstShow
* @param {JSEvent} _event
*
* @properties={typeid:24,uuid:"B381478D-E0A9-4E79-B275-DA09F838147C"}
*/
function onShowForm(_firstShow, _event) 
{
	_super.onShowForm(_firstShow, _event);
	globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());
}

/**
 * Handle changed data.
 *
 * @param {Number} oldValue old value
 * @param {Number} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"73C38263-3EF3-43B6-AAFD-20B6ED5877B8"}
 */
function onDataChangeTipologiaDitta(oldValue, newValue, event)
{
	return true;
}
