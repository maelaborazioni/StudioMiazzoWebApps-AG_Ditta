/**
 * @AllowToRunInFind
 * @properties={typeid:24,uuid:"CBFA7A04-7A05-47E2-BE21-37846C2C6465"}
 */
function filterData(fs)
{
	/** @type {JSFoundset} */
	fs = ditte_to_ditte_sedi;
	
	_super.filterData(fs);
	if(fs && fs.find())
	{
		fs.datachiusura = '^||>=' + globals.formatForFind(globals.TODAY);
		fs.search();
	}
}

/**
 * @properties={typeid:24,uuid:"78BFDDC1-A1D6-4E28-9780-F5239A88A918"}
 */
function unfilterData(fs)
{
	fs = ditte_to_ditte_sedi;
	
	_super.filterData(fs);
	fs.loadAllRecords();
}
