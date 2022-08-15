<template>
	<div class="goodsindex">
		<!-- 上传文件 -->
		<!-- <el-row :gutter="20" class="keycode-Info">
			<el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2" :offset="1">
				<el-button type="primary" class="keycode-Info-li" size="small" @click="keyCodeShow = true">上传文件
				</el-button>
			</el-col>
		</el-row> -->
		<!-- 添加或编辑关键词 -->
		<!-- <el-dialog title="添加关键词" :visible.sync="keyCodeShow">
			<el-form :model="keyCodeForm" :rules="keyCodeRules" ref="keyCodeForm">
				<el-form-item label="名称" :label-width="keyCodeWidth" prop="name">
					<el-input v-model="keyCodeForm.name" autocomplete="off" placeholder="请输入文件名称"></el-input>
				</el-form-item>
				<el-upload class="upload" action="#" drag multiple :headers="headers" :auto-upload="false"
					:file-list="fileList" :on-change="handleChange">
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				</el-upload>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="keyCodeSubmit('keyCodeForm')" type="primary">上 传</el-button>
			</div>
		</el-dialog> -->
		<el-upload class="upload-demo" action="http://10.160.181.146:5000/upload" :on-preview="handlePreview"
			:on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" accept=".zip,.txt" name="file">
			<el-button size="small" type="primary">点击上传</el-button>
			<div slot="tip" class="el-upload__tip">只能上传zip/txt文件</div>
		</el-upload>
		<!-- 搜索条件 -->
		<el-row :gutter="20" class="goodsindex-queryInfo">
			<!-- 商品名称搜索 -->
			<el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4">
				<el-input class="goodsindex-queryInfo-li-one" v-model="queryInfo.name" clearable size="small"
					placeholder="请输入公文名称"></el-input>
			</el-col>
			<el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2">
				<el-button type="primary" class="goodsindex-queryInfo-li-two" size="small">搜索</el-button>
			</el-col>

		</el-row>
		        <!-- 检索结果 -->
        <el-row :gutter="20">
            <el-col :span="24">
                <el-table
                    :data="tableData"
                    size='small'
                    style="width: 100%">
                    <el-table-column
                    type="index"
                    label="序"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    prop="file_name"
                    label="名称"
                    width="150">
                    </el-table-column>
                    <el-table-column
                    prop="task_id"
                    label="任务号"
                    width="70">
                    </el-table-column>
                    <el-table-column
                    prop="file_path"
                    label="文件路径"
                    width="400">
                    </el-table-column>
                    <el-table-column
                    prop="create_time"
                    label="创建时间"
                    width="140">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="sendRequest(scope.row.task_id, scope.row.file_path)">发送请求</el-button>
                        <el-button @click="checkStatus(scope.row.task_id)">查看状态</el-button>
                        <el-button @click="checkResult(scope.row.task_id)">查看结果</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <!--结果展示-->
         <el-dialog :visible.sync="resultShow">
            <el-row :gutter="20" class="result-list">
            <el-col :span="24">
                <el-table
                    :data="resultData"
                    size='small'
                    style="width: 100%">
                    <el-table-column
                    type="index"
                    label="序"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    prop="type"
                    label="状态"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="content"
                    label="正文"
                    width="550"
                    show-overflow-tooltip="true">
                    </el-table-column>
                    
                </el-table>
            </el-col>
            </el-row>
        </el-dialog>
		<!-- 分页 -->
		<el-row :gutter="20" class="goodsindex-list">
			<el-col :span="24" class="goodsindex-page-box">
				<el-pagination :hide-on-single-page="true" @size-change="handleSizeChange"
					@current-change="handleCurrentChange" :current-page="queryInfo.page" :page-sizes="[10, 20, 50, 100]"
					:page-size="queryInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="400">
				</el-pagination>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from "qs"
	axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";

	export default {
		data() {
			return {
				queryInfo: {
					name: '',
					type: '',
					page: 1,
					pageSize: 10
				},
				tableData: [
            ],
            resultData:[
            ],
				 resultShowParams:{    
                    task_id:null,  
                    batch_size:null,    
                    batch_num:null
                },
            sendRequestParams:{
                task_id:null,
                file_path:null,
            },
				keyCodeShow: false,
				resultShow:false,
				keyCodeForm: {
					name: '',
					remarks: ''
				},
				keyCodeRules: {
					name: [{
							required: true,
							message: '请输入文件名称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 5,
							message: '长度在 1 到 5 个字符',
							trigger: 'blur'
						}
					]
				},
				keyCodeWidth: '120px',
			}
		},
		created() {
			this.getTask();
		},
		methods: {
			// 检查归档状态
        checkStatus(task_id){
            axios.get("http://10.160.181.146:5000/classification/status",{
                params:{
                    task_id:task_id
                }
            }).then(result=>{
                alert(result.data.message);
                this.tableData = result.data;
            }
            )
        },
        // 发送归档请求
        sendRequest(task_id, file_path){
            const params = {...this.sendRequestParams};
            params.task_id = task_id;
            params.file_path = file_path;
            axios.post("http://10.160.181.146:5000/classification",params).then(result=>{
                alert(result.data.message);
            }
            )
        },
        // 查看归档结果
        checkResult(task_id){
            this.resultShow = true;
            const params = {...this.resulrShowParams};
            params.task_id = task_id;
            params.batch_size = "20";
            params.batch_num = "1";
            axios.post("http://10.160.181.146:5000/classification/result",params).then(result=>{
                console.log(result.data.message);
                this.resultData = result.data.data;
            }
            )
        },
			submitUpload() {
				this.$refs.upload.submit();
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},

			 // 获取任务
        getTask(){
            axios.get("http://10.160.181.146:5000/get_all",{
                params:{
                    task_type:"归档"
                }
            }).then(result =>{
                this.tableData = result.data.data;
            })
            // const params = {...this.queryParams};
            // params.task_id = 100;
            // params.batch_size = "1";
            // params.batch_num = "5";
            // axios.post("http://10.160.181.146:5000/classification/result",params).then(result=>{
            //     console.log(result.data.message);
            //     this.tableData = result.data.data;
            // }
            // )
            // axios.get("http://10.160.181.146:5000/classification/status",qs.stringify({
            //     task_id:"100",
            // })).then(result=>{
            //     alert(result.data.message);
            //     this.tableData = result.data;
            // }
            // )
            // axios.post("http://10.160.181.146:5000/classification",qs.stringify({
            //     file_path:"/home/app/test_data/test_data_10.zip",
            //     task_id:"103",
            // })).then(result=>{
            //     alert(result.message);
            // }
            // )

        }
    }
	}
</script>

<style scoped>
	.goodsindex {
		width: 100%;
		min-height: 100%;
		padding: 15px;
		box-sizing: border-box;
	}

	/* 搜索 */
	.goodsindex-queryInfo {
		margin-bottom: 20px;
		margin-left: 50%;
	}

	.goodsindex-queryInfo-li-one {
		width: 100%;
		height: auto;
		margin-left: 200%;

	}

	.goodsindex-queryInfo-li-two {
		width: 100%;
		height: auto;
		margin-left: 470%;
	}

	/* 列表 */
	.goodsindex-list {
		width: 100%;
		height: auto;
		margin-bottom: 20px;
	}

	/* 分页 */
	.goodsindex-page-box {
		width: 100%;
		height: auto;
		display: flex;
		justify-content: flex-end;
	}

	.keycode-Info {
		width: 100%;
		margin-bottom: 15px;
	}

	.keycode-Info-li {
		margin-left: 1290%;
		margin-top: 15px;
	}

		
	.upload-demo {
		float: right;
	}
</style>
<style>
.el-tooltip__popper{
    font-size: 10px;
    max-width: 70%;
}
</style>