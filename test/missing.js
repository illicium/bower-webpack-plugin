/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Lukasz Piepiora <lpiepiora@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var testUtils = require('./test-utils');

describe("behaviour when requiring missing modules or files", function () {

  var config = testUtils.config;
  var testBowerPluginError = testUtils.testBowerPluginError;

  beforeEach(testUtils.clearOutput);

  it("should raise errors, when requiring a module, which does not exist", function (done) {
    testBowerPluginError(config("module-missing.js"), done);
  });

  it("should raise errors, when requiring a module, which does not have a 'bower.json' file", function (done) {
    testBowerPluginError(config("module-missing-bower.js"), done);
  });

  it("should raise errors, when requiring a module, which does not have files referenced from a 'bower.json' file", function (done) {
    testBowerPluginError(config("module-missing-referenced-file.js"), done);
  })

});