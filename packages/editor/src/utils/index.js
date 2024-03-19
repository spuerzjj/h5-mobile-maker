// 生成id
export function generateId() {
	function randomHex() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
	}

	return randomHex() + randomHex()
}
