/**
 * @AllowToRunInFind
 * @properties={typeid:24,uuid:"303C346E-8CF0-4A53-9091-A83B82440E37"}
 */
function filterData(fs)
{	
	fs = ditte_to_ditte_sedi;	
	_super.filterData(fs);
	
	if(fs && fs.find())
	{
		fs.datachiusura = '^||>=' + globals.formatForFind(globals.TODAY);
		fs.search();
	}
}

/**
 * @properties={typeid:24,uuid:"609AF6FF-884A-47EB-A901-CE2550284009"}
 */
function unfilterData(fs)
{
	fs = ditte_to_ditte_sedi;
	_super.filterData(fs);
}

/**
*
* @param {JSEvent} _event
* @param {String} _triggerForm
* @param {String} _forceForm
*
* @properties={typeid:24,uuid:"67D81D85-CDDB-4E1F-B4E2-F602D550EAB0"}
*/
function dc_new(_event, _triggerForm, _forceForm) 
{
	var frm = forms.agd_sdl_sedidilavoro_dtl;
	frm.isInEdit = false;
	globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());
	return globals.ma_utl_showFormInDialog(frm.controller.getName(),'Aggiungi una sede di lavoro');
}

/**
*
* @param event
* @param triggerForm
* @param forceForm
*
* @properties={typeid:24,uuid:"9F578362-34E6-4653-9E69-A39E6CC005F9"}
*/
function dc_edit(event, triggerForm, forceForm)
{
	var frm = forms.agd_sdl_sedidilavoro_dtl;
	frm.isInEdit = true;
	globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());
	return globals.ma_utl_showFormInDialog(frm.controller.getName(),'Aggiungi una sede di lavoro');
}

/**
*
* @param {JSEvent} _event
* @param {String} _triggerForm
* @param {String} _forceForm
* @param {Boolean} _noConfirm
*
* @properties={typeid:24,uuid:"CD9D4E37-EF4D-42FA-8244-08ED7EB41A55"}
*/
function dc_delete(_event, _triggerForm, _forceForm, _noConfirm) 
{
	var frm = forms.agd_sdl_sedidilavoro_tbl;
	return frm.dc_delete(_event, _triggerForm, _forceForm, _noConfirm);
}
