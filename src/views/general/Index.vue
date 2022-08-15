<template>
	<div class="goodsindex">
		<!-- 上传文件 -->
		<el-upload class="upload-demo" action="http://10.160.181.146:5000/upload" :on-preview="handlePreview"
			:on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed"
			accept=".zip,.txt" name="file">
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
		<el-row :gutter="20" class="goodsindex-list">
			<el-col :span="24">
				<el-table :data="tableData" border size='small' style="width: 100%">
					<el-table-column type="index" label="序" width="50">
					</el-table-column>
					<el-table-column prop="date" label="产品名称" width="180">
					</el-table-column>
					<el-table-column prop="name" label="产品图片" width="120">
					</el-table-column>
					<el-table-column prop="name" label="原件" width="80">
					</el-table-column>
					<el-table-column prop="name" label="现价" width="80">
					</el-table-column>
					<el-table-column prop="name" label="总量" width="80">
					</el-table-column>
					<el-table-column prop="name" label="库存" width="80">
					</el-table-column>
					<el-table-column prop="name" label="创建者" width="140">
					</el-table-column>
					<el-table-column prop="name" label="创建时间" width="180">
					</el-table-column>
					<el-table-column prop="name" label="修该者" width="140">
					</el-table-column>
					<el-table-column prop="name" label="最后修改时间" width="180">
					</el-table-column>
					<el-table-column prop="address" label="操作">
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
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
	export default {
		data() {
			return {
				queryInfo: {
					name: '',
					type: '',
					page: 1,
					pageSize: 10
				},
				tableData: [],
				keyCodeShow: false,
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
				keyCodeWidth: '120px'
			}
		},
		methods: {
			handleSizeChange() {

			},
			handleCurrentChange() {

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
