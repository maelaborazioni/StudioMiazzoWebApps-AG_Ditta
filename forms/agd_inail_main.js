/**
 * @AllowToRunInFind
 *
 * @properties={typeid:24,uuid:"69170C07-E598-4621-BFE9-FD1E54998002"}
 */
function filterData()
{
//	var fs = ditte_to_ditte_inailposizioni;
//	
//	_super.filterData(fs);
//	if(fs && fs != null && fs.find())
//	{
//		// La data di decorrenza deve essere anteriore alla data odierna
//		fs.datacessazattivita = '^||>=' + globals.formatForFind(globals.TODAY);		
//		fs.search();
//	}
}

/**
 * @properties={typeid:24,uuid:"6F68BD9D-DA81-4FE6-806B-1F98E63DB4FF"}
 */
function unfilterData()
{
	var fs = ditte_to_ditte_inailposizioni
	
	_super.filterData(fs);
	fs.loadAllRecords();
}
