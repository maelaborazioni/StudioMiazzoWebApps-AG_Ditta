/**
 * @properties={type:4,typeid:36,uuid:"E2367A08-197A-4028-A002-A2188CC1A583"}
 */
function domenica()
{
	var ammessa = parseInt(utils.stringLeft(giornateammesse,1),10);
	return ammessa;
}

/**
 * @properties={type:4,typeid:36,uuid:"61C5F941-A2B3-4D89-BDCB-C964D2098796"}
 */
function sabato()
{
	var ammessa = parseInt(utils.stringMiddle(giornateammesse,2,3),10)
	return ammessa;
}

/**
 * @properties={type:4,typeid:36,uuid:"CC0034B4-C250-49E2-A197-B75E6B91D312"}
 */
function primario()
{
	var ammessa = parseInt(utils.stringMiddle(giornateammesse,3,4),10)
	return ammessa;
}

/**
 * @properties={type:4,typeid:36,uuid:"E389E117-7E16-4373-A983-23D7AA97E22D"}
 */
function secondario()
{
	var ammessa = parseInt(utils.stringMiddle(giornateammesse,4,5),10)
	return ammessa;
}

/**
 * @properties={type:4,typeid:36,uuid:"7FEF955F-15E3-4AF3-8AA1-90B7FAF5C389"}
 */
function infrasettimanale()
{
	var ammessa = parseInt(utils.stringRight(giornateammesse,1),10);
	return ammessa;
}
