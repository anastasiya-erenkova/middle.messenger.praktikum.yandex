const app = require("./app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const expect = chai.expect;

chai.use(chaiHttp);

const describe = require("mocha").describe;
const it = require("mocha").it;

describe("Express static", function () {
	it('GET request "/" should return the index page', function () {
		return chai
			.request(app)
			.get("/")
			.then(function (res) {
				expect(res).to.exist;
				expect(res).to.have.status(200);
				expect(res).to.be.html;
			});
	});
});
