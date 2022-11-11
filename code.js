
// 전역 변수 선언부
let inCanvas, inCtx, inPaper, inFile;
let inImage, inH, inW;

let outCanvas, outCtx, outPaper;
let outImage, outH, outW;

let saveImage, saveH, saveW;

//함수 선언부
function init() {
    inCanvas = document.getElementById("inCanvas");
    inCtx = inCanvas.getContext('2d');
    outCanvas = document.getElementById("outCanvas");
    outCtx = outCanvas.getContext('2d');
}

function openImage() {
    inFile = document.getElementById("inFile").files[0];
    inH = inW = Math.floor(Math.sqrt(inFile.size));
    saveH = inH;
    saveW = inW;


    inImage = new Array(inH);
    for (let i = 0; i < inH; i++)
        inImage[i] = new Array(inW);

    saveImage = new Array(saveH);

    for (let i = 0; i < saveH; i++)
        saveImage[i] = new Array(saveW);


    inCanvas.height = inH;
    inCanvas.width = inW;

    //파일 --> 메모리로 로딩
    let reader = new FileReader();
    reader.readAsBinaryString(inFile);
    reader.onload = function () {
        let blob = reader.result; // 파일을 한 덩어리(blob)로 가져옴

        for (let i = 0; i < inH; i++) {
            for (let k = 0; k < inW; k++) {
                let sPixel = (i * inH + k); //시작위치
                let ePixel = (i * inH + k) + 1; // 끝 위치
                inImage[i][k] = blob.slice(sPixel, ePixel).charCodeAt(0);
                //자바스크립트 pick 제공 x 자르는것만 제공
            }
        }

        //업로드 된 파일 이름 표시 부분
        let imgNmae = inFile.name;
        let upload_name = document.getElementById("upload-name");
        console.log(upload_name);
        upload_name.value= imgNmae;

        displayImage();



    }

}

function displayImage() {
    inPaper = inCtx.createImageData(inH, inW); //빈 종이 준비
    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            let px = inImage[i][k];
            inPaper.data[(i * inH + k) * 4 + 0] = px; // Red
            inPaper.data[(i * inH + k) * 4 + 1] = px; // Green
            inPaper.data[(i * inH + k) * 4 + 2] = px; // Blue
            inPaper.data[(i * inH + k) * 4 + 3] = 255; // Alpha - 투명도
        }
    }
    inCtx.putImageData(inPaper, 0, 0); // 종이를 캔버스 0,0에 붙이기

    outPaper = outCtx.createImageData(outH, outW); //빈 종이 준비
    for (let i = 0; i < outH; i++) {
        for (let k = 0; k < outW; k++) {
            let px = outImage[i][k];
            outPaper.data[(i * outH + k) * 4 + 0] = px; // Red
            outPaper.data[(i * outH + k) * 4 + 1] = px; // Green
            outPaper.data[(i * outH + k) * 4 + 2] = px; // Blue
            outPaper.data[(i * outH + k) * 4 + 3] = 255; // Alpha - 투명도
        }
    }
    outCtx.putImageData(outPaper, 0, 0); // 종이를 캔버스 0,0에 붙이기
}

// 영상처리 알고리즘 함수부
function selectAlgo(selNum) {
    switch (parseInt(selNum.value)) {

        // 화소점 case: 100 ~ 107
        case 100: equal_image(); break;
        case 101: add_image(); break;
        case 103: reverse_image(); break;
        case 104: minus_image(); break;
        case 105: blackWhite_image(); break;
        case 106: blackWhite_Aver_image(); break;
        case 107: blackWhite_mid_image(); break;

        // 기하학 case: 201 ~ 205
        case 201: mirror1_image(); break;
        case 202: mirror2_image(); break;
        case 203: zoom_out(); break;
        case 204: zoom_in_forw(); break;
        case 205: zoom_in_backw(); break;


        // Mission case: 300 ~ 305
        case 301: gamma(); break;
        case 302: highlight_Range(); break;
        case 303: p_Cap(); break;
        case 304: p_Cup(); break;
        case 305: move(); break;
        case 306: rotate(); break;

        // Histo case: 401 ~ 400
        case 401: histo_St(); break;
        case 402: endIn(); break;
        case 403: histioEqula_img(); break;

        // 화소 case: 501 ~ 504
        case 501: embos_image(); break;
        case 502: blur_image(); break;
        case 503: edge_image(); break;
        case 504: Log(); break;
        case 505: DoG7x7(); break;
        case 506: homoO(); break;
        case 507: difO(); break;
        case 508: gausian_filter(); break;
    }
}

// 화소점 case: 100 ~ 107
function equal_image() {
    outH = inH;
    outW = inW;

    outImage = new Array(outH);
    for (let i = 0; i < outW; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;

    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            outImage[i][k] = inImage[i][k];
        }
    }
    displayImage();
}

function add_image() {
    outH = inH;
    outW = inW;

    outImage = new Array(outH);
    for (let i = 0; i < outW; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;

    let value = parseInt(prompt("밝게하기", "정수값 -->"));
    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            if (inImage[i][k] + value + value > 255)
                outImage[i][k] = 255;
            else
                outImage[i][k] = inImage[i][k] + value;
        }
    }
    displayImage();
}

function minus_image() {
    outH = inH;
    outW = inW;

    outImage = new Array(outH);
    for (let i = 0; i < outW; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;


    let value = parseInt(prompt("어둡게 하기", "정수값 -->"));
    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            if (inImage[i][k] - value < 0)
                outImage[i][k] = 0;
            else
                outImage[i][k] = inImage[i][k] - value;
        }
    }
    displayImage();

}

function reverse_image() {

    outH = inH;
    outW = inW;

    outImage = new Array(outH);
    for (let i = 0; i < outW; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;


    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            outImage[i][k] = 255 - inImage[i][k];
        }
    }
    displayImage();

}

function minus_image() {

    outH = inH;
    outW = inW;

    outImage = new Array(outH);
    for (let i = 0; i < outW; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;


    let value = parseInt(prompt("어둡게 하기", "정수값 -->"));
    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            if (inImage[i][k] - value < 0)
                outImage[i][k] = 0;
            else
                outImage[i][k] = inImage[i][k] - value;
        }
    }
    displayImage();

}

function blackWhite_image() {

    outH = inH;
    outW = inW;

    outImage = new Array(outH);
    for (let i = 0; i < outW; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;

    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            if (inImage[i][k] >= 128)
                outImage[i][k] = 255;
            else
                outImage[i][k] = 0;

        }
    }
    displayImage();

}

function blackWhite_Aver_image() { //흑백 평균값

    outH = inH;
    outW = inW;

    outImage = new Array(outH);
    for (let i = 0; i < outW; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;

    let inImage_sum = 0;
    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++)
            inImage_sum += inImage[i][k]
    }

    let agerage = inImage_sum / (inH * inW);

    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            if (inImage[i][k] > agerage)
                outImage[i][k] = 255;
            else
                outImage[i][k] = 0;

        }
    }
    displayImage();

}

function blackWhite_mid_image() { //흑백 중앙값

    outH = inH;
    outW = inW;

    outImage = new Array(outH);
    for (let i = 0; i < outW; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;


    // 2차원 배열 > 1차원으로 펼쳐서 중간값 계산

    let tmpArray = new Array(inH * inW);
    let index = 0;

    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++)
            tmpArray[index++] = inImage[i][k];
    }

    tmpArray.sort();
    let avg_val = tmpArray[parseInt((inH * inW) / 2)];

    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            if (inImage[i][k] > avg_val)
                outImage[i][k] = 255;
            else
                outImage[i][k] = 0;
        }
    }
    displayImage();
}

// 기하학 case: 201 ~ 205
function mirror1_image() { //가로세로 반전

    outH = inH;
    outW = inW;

    outImage = new Array(outH);
    for (let i = 0; i < outW; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;

    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            outImage[i][inW - 1 - k] = inImage[i][k];
        }
    }
    displayImage();
}

function mirror2_image() { //상하미러링

    outH = inH;
    outW = inW;

    outImage = new Array(outH);
    for (let i = 0; i < outW; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;

    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            outImage[inW - 1 - i][k] = inImage[i][k];
        }
    }
    displayImage();
}

function zoom_out() { //줌 아웃, 축소
    let scale = parseInt(prompt("축소배율", 2));

    outH = parseInt(inH / scale); //뭐든 깔끔하게 하는게...
    outW = parseInt(inW / scale);

    outImage = new Array(outH);
    for (let i = 0; i < outW; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;

    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            outImage[parseInt(i / scale)][parseInt(k / scale)] = inImage[i][k]
        }
    }
    displayImage();
}

function zoom_in_forw() { //줌인 확대
    let scale = parseInt(prompt("확대배율", 2));

    outH = parseInt(inH * scale); //뭐든 깔끔하게 하는게...
    outW = parseInt(inW * scale);

    outImage = new Array(outH);
    for (let i = 0; i < outW; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;

    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            outImage[parseInt(i * scale)][parseInt(k * scale)] = inImage[i][k];
        }
    }
    displayImage();
}

function zoom_in_backw() { //줌인 - 포워딩 백워딩 기법
    let scale = parseInt(prompt("확대배율", 2));

    outH = parseInt(inH * scale);
    outW = parseInt(inW * scale);

    outImage = new Array(outH);
    for (let i = 0; i < outW; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;

    for (let i = 0; i < outH; i++) {
        for (let k = 0; k < outW; k++) {
            outImage[i][k] = inImage[parseInt(i / scale)][parseInt(k / scale)];
        }
    }
    displayImage();
}

// Mission case: 300 ~ 305
function gamma() {
    let gamma_V = prompt("감마 값", 1);

    outH = inH;
    outW = inW;
    // 이미지 크기의 2차원 메모리 할당( 확보)
    outImage = new Array(outH);
    for (let i = 0; i < outW; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;

    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            outImage[i][k] = Math.pow(inImage[i][k], 1 / gamma_V);
        }
    }
    displayImage();

}

function highlight_Range() {
    let minRange = prompt("작은 범위", 1);
    let maxRange = prompt("큰 범위", 1);


    outH = inH;
    outW = inW;

    outImage = new Array(outH);
    for (let i = 0; i < outW; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;

    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            if (inImage[i][k] < maxRange && inImage[i][k] > minRange) {
                outImage[i][k] = 255;
            }
            else {
                outImage[i][k] = inImage[i][k];
            }

        }
    }
    displayImage();
}

function p_Cap() {

    outH = inH;
    outW = inW;

    outImage = new Array(outH);
    for (let i = 0; i < outW; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;

    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            outImage[i][k] = 255 - 255 * Math.pow((inImage[i][k] / 127 - 1), 2);

        }
    }

    displayImage();

}

function p_Cup() {

    outH = inH;
    outW = inW;

    outImage = new Array(outH);
    for (let i = 0; i < outW; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;

    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            outImage[i][k] = 255 * Math.pow((inImage[i][k] / 127 - 1), 2);

        }
    }

    displayImage();

}

function move() {
    let move_x = prompt("이동 x 값", 50);
    let move_y = prompt("이동 y 값", 50);

    outH = inH;
    outW = inW;

    outImage = new Array(outH);
    for (let i = 0; i < outW; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;

    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            if (k < move_x || i < move_y) {
                outImage[i][k] = 0;
            }
            else
                outImage[i][k] = inImage[i - move_y][k - move_x];
        }
    }
    displayImage();
}

function rotate() { // 생각 더 해보기 흑흑....
    let scale = parseInt(prompt("회전시킬 각도를 입력하세요", 90));
    let radian = scale * (Math.PI / 180);

    outH = inH;
    outW = inW;

    outImage = new Array(outH);
    for (let i = 0; i < outH; i++) {
        outImage[i] = new Array(outW);
    }

    outCanvas.height = outH;
    outCanvas.width = outW;

    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            let centerX = centerY = parseInt(inH / 2);
            let x = parseInt((i - centerX) * Math.cos(radian) - (k - centerY) * Math.sin(radian) + centerX);
            let y = parseInt((i - centerX) * Math.sin(radian) + (k - centerY) * Math.cos(radian) + centerY);
            if ((0 <= x && x <= 255) && (0 <= y && y <= 255)) {
                outImage[i][k] = inImage[x][y];
            }
        }
    }
    displayImage();

}

// Histo case : 401 ~ 403
function histo_St() {

    outH = inH;
    outW = inW;

    outImage = new Array(outH);
    for (let i = 0; i < outW; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;

    // noutImage = (inImage - low) / (high - low) * 255
    let low = inImage[0][0], high = inImage[0][0];
    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            if (inImage[i][k] < low)
                low = inImage[i][k];
            if (inImage[i][k] > high)
                high = inImage[i][k];
        }
    }
    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            outImage[i][k] = (inImage[i][k] - low) / (high - low) * 255;
        }
    }
    displayImage();
}

function endIn() {

    outH = inH;
    outW = inW;

    outImage = new Array(outH);
    for (let i = 0; i < outW; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;

    // noutImage = (inImage - low) / (high - low) * 255
    let low = inImage[0][0], high = inImage[0][0]; // low > 0 이 아님 반복문



    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            if (inImage[i][k] < low)
                low = inImage[i][k];
            if (inImage[i][k] > high)
                high = inImage[i][k];

        }
    }
    low += 50;
    high -= 50;


    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            outImage[i][k] = (inImage[i][k] - low) / (high - low) * 255;
        }

    }
    displayImage();
}

function histioEqula_img() { //평활화

    outH = inH;
    outW = inW;

    outImage = new Array(outH);
    for (let i = 0; i < outW; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;



    //1단계 : 히스토그램 생성
    let histo = new Array(256); // 0-255 픽셀 값 종류
    for (let i = 0; i < 256; i++) { //초기화
        histo[i] = 0;
    }
    for (let i = 0; i < inH; i++)
        for (let k = 0; k < inW; k++)
            histo[inImage[i][k]]++;

    // 2단계 : 누적 히스토그램 생ㅎ성
    let sumHisto = new Array(256);
    for (let i = 0; i < outW; i++)
        outImage[i] = new Array(outW);
    let sumValue = 0;
    for (let i = 0; i < 256; i++) {
        sumValue += histo[i];
        sumHisto[i] = sumValue;
    }

    //3단계: 정규화된 누적화
    //nomal[i] = sumHisto[i] * (1/ (inH*inW)) * 255
    let nomalHisto = new Array(256); // 0-255 픽셀 값 종류
    for (let i = 0; i < 256; i++) //초기화
        nomalHisto[i] = 0.0; // 계산은 일단 실수로 해야함. 버그가 잘 생겨서,,, 계산식은 실수로 잡기.
    for (let i = 0; i < 256; i++) {
        nomalHisto[i] = sumHisto[i] * (1.0 / (inH * inW)) * 255.0;
    }
    //최종: 정규화된 히스토그램을 변형시켜서 픽셀값 적용

    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++)
            outImage[i][k] = parseInt(nomalHisto[inImage[i][k]]);
    }

    displayImage();
}

// 화소영역 case : 501 ~ 507
function embos_image() {

    outH = inH;
    outW = inW;

    outImage = new Array(outH);
    for (let i = 0; i < outH; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;

    let mask = [[-1.0, 0.0, 0.0],
    [0.0, 0.0, 0.0],
    [0.0, 0.0, 1.0]];
    // 임시 입력 배열 (입력배열+2)
    let tmpInput = new Array(inH + 2);
    for (let i = 0; i < inH + 2; i++)
        tmpInput[i] = new Array(inW + 2);
    // 임시 입력 배열 초기화(127로)
    for (let i = 0; i < inH + 2; i++)
        for (let k = 0; k < inW + 2; k++)
            tmpInput[i][k] = 127.0;
    // 원 입력 --> 임시 입력.. 가운데 쏙~
    for (let i = 0; i < inH; i++)
        for (let k = 0; k < inW; k++)
            tmpInput[i + 1][k + 1] = parseFloat(inImage[i][k]);
    // 임시 출력 배열 (출력배열 크기 동일)
    let tmpOutput = new Array(outH);
    for (let i = 0; i < outH; i++)
        tmpOutput[i] = new Array(outW);
    // **** 회선 연산 ***
    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            // 한 점에 대해서 처리
            let S = 0.0;
            for (let m = 0; m < 3; m++) {
                for (let n = 0; n < 3; n++) {
                    S += tmpInput[i + m][k + n] * mask[m][n]
                }
            }
            tmpOutput[i][k] = S;
        }
    }
    // 후처리 :마스크 합계가 0이라면 127 정도를 더하기.
    for (let i = 0; i < outH; i++)
        for (let k = 0; k < outW; k++)
            tmpOutput[i][k] += 127.0;
    // 임시 출력 --> 원 출력
    for (let i = 0; i < outH; i++)
        for (let k = 0; k < outW; k++)
            outImage[i][k] = parseInt(tmpOutput[i][k]);
    displayImage();
}

function blur_image() {

    outH = inH;
    outW = inW;

    outImage = new Array(outH);
    for (let i = 0; i < outW; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;

    // (짱! 중요)
    let mask = [
        [1 / 9., 1 / 9., 1 / 9.],
        [1 / 9., 1 / 9., 1 / 9.],
        [1 / 9., 1 / 9., 1 / 9.]
    ];

    // 임시 입력 배열(입력배열 + 2)
    let tmpInput = new Array(inH + 2);
    for (let i = 0; i < inH + 2; i++)
        tmpInput[i] = new Array(inW + 2);

    //임시 입력 배열 초기화(127로)
    for (let i = 0; i < inH + 2; i++)
        for (let k = 0; k < inW + 2; k++)
            tmpInput[i][k] = 127.0;

    //원 입력 -> 임시 입력 가운데로
    for (let i = 0; i < inH; i++)
        for (let k = 0; k < inW; k++)
            tmpInput[i + 1][k + 1] = parseFloat(inImage[i][k]);

    //임시 출력 배열(출력배열 크기 동일 )
    let tmpOutput = new Array(outH);
    for (let i = 0; i < outH; i++)
        tmpOutput[i] = new Array(outW);

    //mask 회선연산
    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            let S = 0.0;
            for (let m = 0; m < 3; m++) {//마스크 행
                for (let n = 0; n < 3; n++) { //마스크 열
                    S += tmpInput[i + m][k + n] * mask[m][n];
                }
            }
            tmpOutput[i][k] = S;
        }
    }

    //임시 출력 > 원 출력
    for (let i = 0; i < outH; i++)
        for (let k = 0; k < outW; k++)
            outImage[i][k] = parseInt(tmpOutput[i][k]);
    displayImage();
}

function gausian_filter() {

    outH = inH;
    outW = inW;

    outImage = new Array(outH);
    for (let i = 0; i < outW; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;

    // (짱! 중요)
    let mask = [
        [1 / 16., 1 / 8., 1 / 16.],
        [1 / 8., 1 / 4., 1 / 8.],
        [1 / 16., 1 / 8., 1 / 16.]
    ];

    // 임시 입력 배열(입력배열 + 2)
    let tmpInput = new Array(inH + 2);
    for (let i = 0; i < inH + 2; i++)
        tmpInput[i] = new Array(inW + 2);

    //임시 입력 배열 초기화(127로)
    for (let i = 0; i < inH + 2; i++)
        for (let k = 0; k < inW + 2; k++)
            tmpInput[i][k] = 127.0;

    //원 입력 -> 임시 입력 가운데로
    for (let i = 0; i < inH; i++)
        for (let k = 0; k < inW; k++)
            tmpInput[i + 1][k + 1] = parseFloat(inImage[i][k]);

    //임시 출력 배열(출력배열 크기 동일 )
    let tmpOutput = new Array(outH);
    for (let i = 0; i < outH; i++)
        tmpOutput[i] = new Array(outW);

    //mask 회선연산
    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            let S = 0.0;
            for (let m = 0; m < 3; m++) {//마스크 행
                for (let n = 0; n < 3; n++) { //마스크 열
                    S += tmpInput[i + m][k + n] * mask[m][n];
                }
            }
            tmpOutput[i][k] = S;
        }
    }

    //임시 출력 > 원 출력
    for (let i = 0; i < outH; i++)
        for (let k = 0; k < outW; k++)
            outImage[i][k] = parseInt(tmpOutput[i][k]);
    displayImage();
}

function edge_image() {

    outH = inH;
    outW = inW;

    outImage = new Array(outH);
    for (let i = 0; i < outH; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;

    let mask = [[0., -1., 0.],
    [-1., 2., 0.],
    [0., 0., 0.]];
    // 임시 입력 배열 (입력배열+2)
    let tmpInput = new Array(inH + 2);
    for (let i = 0; i < inH + 2; i++)
        tmpInput[i] = new Array(inW + 2);
    // 임시 입력 배열 초기화(127로)
    for (let i = 0; i < inH + 2; i++)
        for (let k = 0; k < inW + 2; k++)
            tmpInput[i][k] = 127.0;
    // 원 입력 --> 임시 입력.. 가운데 쏙~
    for (let i = 0; i < inH; i++)
        for (let k = 0; k < inW; k++)
            tmpInput[i + 1][k + 1] = parseFloat(inImage[i][k]);
    // 임시 출력 배열 (출력배열 크기 동일)
    let tmpOutput = new Array(outH);
    for (let i = 0; i < outH; i++)
        tmpOutput[i] = new Array(outW);
    // **** 회선 연산 ***
    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            // 한 점에 대해서 처리
            let S = 0.0;
            for (let m = 0; m < 3; m++) {
                for (let n = 0; n < 3; n++) {
                    S += tmpInput[i + m][k + n] * mask[m][n]
                }
            }
            tmpOutput[i][k] = S;
        }
    }

    // 임시 출력 --> 원 출력
    for (let i = 0; i < outH; i++)
        for (let k = 0; k < outW; k++)
            outImage[i][k] = parseInt(tmpOutput[i][k]);
    displayImage();
}

function Log() {

    outH = inH;
    outW = inW;

    outImage = new Array(outH);
    for (let i = 0; i < outH; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;

    let mask = [
        [0., 0., -1., 0., 0.],
        [0., -1., -2., -1., 0.],
        [-1., -2., 16., -2., -1.],
        [0., -1., -2., -1., 0.],
        [0., 0., -1., 0., 0.]

    ];
    // 임시 입력 배열 (입력배열+2)
    let tmpInput = new Array(inH + 4);
    for (let i = 0; i < inH + 4; i++)
        tmpInput[i] = new Array(inW + 4);

    // 임시 입력 배열 초기화(127로)
    for (let i = 0; i < inH + 4; i++)
        for (let k = 0; k < inW + 4; k++)
            tmpInput[i][k] = 127.0;

    // 원 입력 --> 임시 입력.. 가운데 쏙~
    for (let i = 0; i < inH; i++)
        for (let k = 0; k < inW; k++)
            tmpInput[i + 1][k + 1] = parseFloat(inImage[i][k]);

    // 임시 출력 배열 (출력배열 크기 동일)
    let tmpOutput = new Array(outH);
    for (let i = 0; i < outH; i++)
        tmpOutput[i] = new Array(outW);

    // **** 회선 연산 ***
    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            // 한 점에 대해서 처리
            let S = 0.0;
            for (let m = 0; m < 5; m++) {
                for (let n = 0; n < 5; n++) {
                    S += tmpInput[i + m][k + n] * mask[m][n]
                }
            }
            tmpOutput[i][k] = S;
        }
    }

    // 임시 출력 --> 원 출력
    for (let i = 0; i < outH; i++)
        for (let k = 0; k < outW; k++)
            outImage[i][k] = parseInt(tmpOutput[i][k]);
    displayImage();
}

function DoG7x7() {

    outH = inH;
    outW = inW;

    outImage = new Array(outH);
    for (let i = 0; i < outH; i++)
        outImage[i] = new Array(outW);

    outCanvas.height = outH;
    outCanvas.width = outW;

    let mask = [
        [0., 0., -1., -1., -1., 0., 0.],
        [0., -2., -3., -3., -3., -2., 0.],
        [-1., -3., 5, 5, 5, -3., -1.],
        [-1., -3., 5, 16, 5, -3., -1.],
        [-1., -3., 5, 5, 5, -3., -1.],
        [0., -2., -3., -3., -3., -2., 0.],
        [0., 0., -1., -1., -1., 0., 0.]
    ];
    // 임시 입력 배열 (입력배열+2)
    let tmpInput = new Array(inH + 6);
    for (let i = 0; i < inH + 6; i++)
        tmpInput[i] = new Array(inW + 6);

    // 임시 입력 배열 초기화(127로)
    for (let i = 0; i < inH + 6; i++)
        for (let k = 0; k < inW + 6; k++)
            tmpInput[i][k] = 127.0;

    // 원 입력 --> 임시 입력.. 가운데 쏙~
    for (let i = 0; i < inH; i++)
        for (let k = 0; k < inW; k++)
            tmpInput[i + 1][k + 1] = parseFloat(inImage[i][k]);

    // 임시 출력 배열 (출력배열 크기 동일)
    let tmpOutput = new Array(outH);
    for (let i = 0; i < outH; i++)
        tmpOutput[i] = new Array(outW);

    // **** 회선 연산 ***
    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            // 한 점에 대해서 처리
            let S = 0.0;
            for (let m = 0; m < 7; m++) {
                for (let n = 0; n < 7; n++) {
                    S += tmpInput[i + m][k + n] * mask[m][n]
                }
            }
            tmpOutput[i][k] = S;
        }
    }

    // 임시 출력 --> 원 출력
    for (let i = 0; i < outH; i++)
        for (let k = 0; k < outW; k++)
            outImage[i][k] = parseInt(tmpOutput[i][k]);

    displayImage();
}

function homoO() {

    outH = inH;
    outW = inW;


    outImage = new Array(outH);
    for (let i = 0; i < outH; i++)
        outImage[i] = new Array(outW);


    outCanvas.height = outH;
    outCanvas.width = outW;



    // 임시 입력 배열 (입력배열+2)
    let tmpInput = new Array(inH + 2);
    for (let i = 0; i < inH + 2; i++)
        tmpInput[i] = new Array(inW + 2);

    // 임시 입력 배열 초기화(127로)
    for (let i = 0; i < inH + 2; i++)
        for (let k = 0; k < inW + 2; k++)
            tmpInput[i][k] = 127.0;

    // 원 입력 --> 임시 입력.. 가운데 쏙~
    for (let i = 0; i < inH; i++)
        for (let k = 0; k < inW; k++)
            tmpInput[i + 1][k + 1] = parseFloat(inImage[i][k]);

    // 임시 출력 배열 (출력배열 크기 동일)
    let tmpOutput = new Array(outH);
    for (let i = 0; i < outH; i++)
        tmpOutput[i] = new Array(outW);

    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            max = 0.0;
            for (let n = 0; n < 3; n++) {
                for (let m = 0; m < 3; m++) {
                    if (parseInt(tmpInput[i + 1][k + 1] - tmpInput[i + n][k + m]) >= max) {
                        max = parseInt(tmpInput[i + 1][k + 1] - tmpInput[i + n][k + m]);
                    }
                }
            }
            outImage[i][k] = max;
        }

    }
    displayImage();
}

function difO() {

    outH = inH;
    outW = inW;


    outImage = new Array(outH);
    for (let i = 0; i < outH; i++)
        outImage[i] = new Array(outW);


    outCanvas.height = outH;
    outCanvas.width = outW;



    // 임시 입력 배열 (입력배열+2)
    let tmpInput = new Array(inH + 2);
    for (let i = 0; i < inH + 2; i++)
        tmpInput[i] = new Array(inW + 2);

    // 임시 입력 배열 초기화(127로)
    for (let i = 0; i < inH + 2; i++)
        for (let k = 0; k < inW + 2; k++)
            tmpInput[i][k] = 127.0;

    // 원 입력 --> 임시 입력.. 가운데 쏙~
    for (let i = 0; i < inH; i++)
        for (let k = 0; k < inW; k++)
            tmpInput[i + 1][k + 1] = parseFloat(inImage[i][k]);

    // 임시 출력 배열 (출력배열 크기 동일)
    let tmpOutput = new Array(outH);
    for (let i = 0; i < outH; i++)
        tmpOutput[i] = new Array(outW);

    for (let i = 0; i < inH; i++) {
        for (let k = 0; k < inW; k++) {
            max = 0.0; // max 초기화
            for (let n = 0; n < 3; n++) {
                for (let m = 0; m < 3; m++) {
                    let d = n * 2 + m; // 제한자.
                    if (d < 3) {
                        if (parseInt(tmpInput[i + n][k + m] - tmpInput[i + (2 - n)][k + (2 - m)]) >= max) {
                            max = tmpInput[i + n][k + m] - tmpInput[i + (2 - n)][k + (2 - m)];
                        }
                    }
                }
            }
            outImage[i][k] = max;
        }

    }

    displayImage();
}
