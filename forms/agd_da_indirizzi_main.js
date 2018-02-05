/**
 * @param {JSFoundset<db:/ma_anagrafiche/ditte_indirizzi>} [fs]
 * @AllowToRunInFind
 *
 * @properties={typeid:24,uuid:"A2D3D496-50DA-4F82-AB97-FEAD611CB6AA"}
 */
function filterData(fs)
{
	if(fs && fs.find())
	{
		fs.datadecorrenza = '^||<=' + globals.formatForFind(globals.TODAY);
		fs.datarilevazione = '^||<=' + globals.formatForFind(globals.TODAY);
		
		fs.search();
	}
}

/**
 * @param {JSFoundset<db:/ma_anagrafiche/ditte_indirizzi>} [fs]
 *
 * @properties={typeid:24,uuid:"FE5DDD7B-F5DC-44AF-ABE7-EC415595AFE0"}
 */
function unfilterData(fs)
{
	if(fs)
	{
		fs.loadAllRecords();
	}
}

/**
 * @properties={typeid:24,uuid:"13BA7C88-729D-4E5C-804E-9B9A72B7E070"}
 */
function getEditFormName()
{
	return forms.agd_indirizzo_edit.controller.getName();
}

/**
 * @properties={typeid:24,uuid:"703A758B-7CD2-4639-AB62-B2D52A2101C5"}
 */
function getEditFoundset()
{
	return ditte_to_ditte_indirizzi;
}
