class UserUpload {

	#user_id
	#course_id;
	#sentence;
	#img;
	#id_upload;
	#course_title;

	constructor (upload, bddrow, bodyjson) {
		if (upload) {
			this.#id_upload = upload.id_upload;
			this.#course_id = upload.course_id;
			this.#sentence = upload.sentence;
			this.#user_id = upload.user_id;
			this.#img = upload.img;
			this.#course_title = upload.course_title;
		} else if (bddrow) {
			this.#id_upload = bddrow.id_upload;
			this.#course_id = bddrow.course_id;
			this.#sentence = bddrow.sentence;
			this.#user_id = bddrow.user_id;
			this.#img = bddrow.img;
			this.#course_title = bddrow.course_title;
		} else if (bodyjson) {
			this.#id_upload = bodyjson.id_upload;
			this.#course_id = bodyjson.course_id;
			this.#sentence = bodyjson.sentence;
			this.#img = bodyjson.img;
			this.#course_title = bodyjson.course_title;
			if (bodyjson.user_id)
				this.#user_id = bodyjson.user_id;
		} else {
			this.#id_upload = null;
			this.#course_id = null;
			this.#sentence = null;
			this.#user_id = null;
			this.#img = null;
			
		}
	}

	toObject (incPwd, incId, incAu) {
		let object = {}
		if (incId === true) {
			object.user_id = this.#user_id;
		}
		object.id_upload = this.#id_upload,
		object.sentence = this.#sentence,
		object.course_title = this.#course_title,
		object.img = this.#img
		if (incPwd === true) {
			object.course_id = this.#course_id;
		}
		return object;
	}
	
	get img () { return this.#img; };
	get course_id () { return this.#course_id; };
	get course_title () { return this.#course_title; };
	get id_upload () { return this.#id_upload; };
	get sentence () { return this.#sentence; };
	get user_id () { return this.#user_id; };

	set id_upload (id_upload) { this.#id_upload = id_upload; };
	set course_id (course_id) { this.#course_id = course_id; };
	set course_title (course_title) { this.#course_title = course_title; };
	set sentence (sentence) { this.#sentence = sentence; };
	set user_id (id) { this.#user_id = id; };
	set img (img) { this.#img = img; };
}

module.exports = UserUpload;