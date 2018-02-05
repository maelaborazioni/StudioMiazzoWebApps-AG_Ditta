/**
 * @properties={type:12,typeid:36,uuid:"CA76DDE3-7869-4FBA-B81E-1AB0BC76179E"}
 */
function valido_dal_periodo()
{
	if(periodo_dal == null)
		return "";
	var anno = utils.stringLeft(periodo_dal.toString(),4);
	var mese = utils.stringRight(periodo_dal.toString(),2);
	return mese + "/" + anno;
}

/**
 * @properties={type:12,typeid:36,uuid:"F223DE36-655C-4F4D-AFF7-5960CA5B571C"}
 */
function valido_al_periodo()
{
	if(periodo_al == null)
		return "";
	var anno = utils.stringLeft(periodo_al.toString(),4);
	var mese = utils.stringRight(periodo_al.toString(),2);
	return mese + "/" + anno;
}
