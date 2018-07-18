/**
 * @properties={typeid:24,uuid:"5967688D-69EE-4A3A-80CA-F69FE64626E6"}
 */
function gotoEdit()
{
	_super.gotoEdit();
	controller.focusField(elements.fld_codice.getName(), true)
}

/**
 * @param {JSFoundSet<db:/ma_anagrafiche/ditte_turni>} _foundset
 * @param {String} [_program]
 * 
 * @return {Number}
 *
 * @properties={typeid:24,uuid:"908F2C1B-D0E8-4791-A743-2C0529B0FEB2"}
 */
function dc_save_validate(_foundset, _program)
{
	try
	{
		return (_super.dc_save_validate(_foundset,'AG_Req_Turno') !== -1 && globals.validaDittaTurno(_foundset.getSelectedRecord())) ? 0 : -1
	}
	catch(ex)
	{
		globals.ma_utl_showErrorDialog(ex.message);
		return -1
	}
}
