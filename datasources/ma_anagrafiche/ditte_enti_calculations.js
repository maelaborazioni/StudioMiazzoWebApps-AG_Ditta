/**
 * @properties={type:12,typeid:36,uuid:"05746A38-EE9A-48BF-91D6-BA614BAE61FD"}
 */
function valido_al()
{
	if(periodo_al)
	   return utils.stringMiddle(periodo_al.toString(),5,2) + '/' + utils.stringLeft(periodo_al.toString(),4);
	else
		return '';
}

/**
 * @properties={type:12,typeid:36,uuid:"CB12B6CF-EBA4-4132-BAA6-3FA424E2DAAE"}
 */
function valido_dal()
{
	if(periodo_dal)
	   return utils.stringMiddle(periodo_dal.toString(),5,2) + '/' + utils.stringLeft(periodo_dal.toString(),4);
	else 
		return '';
}
