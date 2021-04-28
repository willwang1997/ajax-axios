<template>
  <div class="upload_component">
    <Spin fix v-if="showSpin"></Spin>
    <Upload
      ref="upload"
      :type="type"
      :headers="headers"
      :show-upload-list="false"
      :default-file-list="defaultList"
      :on-success="handleSuccess"
      :on-error="handleError"
      :format="formate"
      :max-size="maxSize"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      action=""
    >
      <div
        style="width: 256px; height: 147px; padding: 27px"
        v-if="upLoadFileType === 'pic'"
      >
        <Icon type="ios-cloud-upload" size="52" style="color: #8558fa"></Icon>
        <p>点击或拖动上传</p>
      </div>
      <div v-if="upLoadFileType === 'file'">
        <Button type="primary">上传</Button>
      </div>
    </Upload>
    <!-- <Modal title="View Image" v-model="visible">
      <img
        :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'"
        v-if="visible"
        style="width: 100%"
      />
    </Modal> -->
  </div>
</template>
<script>
// import { getToken } from '@/libs/util';
import { axios } from '@/libs/api.request';
export default {
  props: {
    uploadUrl: {
      type: [String],
      default: ''
    },
    maxSize: {
      type: [Number],
      default: 10 * 1000 * 1024
    },
    formate: {
      type: [Array],
      default: function() {
        return ['jpg', 'jpeg', 'png', 'zip', 'pdf', 'emf'];
      }
    },
    // 上传文件的类型 图片  附件
    upLoadFileType: {
      type: [String],
      default: 'pic'
    },
    // 上传控件的类型--拖拽会显示虚线
    type: {
      type: [String],
      default: 'drag'
    }
  },
  data() {
    return {
      defaultList: [],
      imgName: '',
      visible: false,
      uploadList: [],
      previewUrl: null,
      // 上传时loading
      showSpin: false,
      headers: {}
    };
  },
  methods: {
    // 上传图片 - 预览图片
    handleView(item) {
      this.previewUrl = item.picUrl;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      this.uploadList.splice(fileList.indexOf(file), 1);
      // console.log(this.uploadList, fileList);
    },
    handleSuccess(res, file) {
      // file.picUrl = 'http://218.77.107.35:10008/' + res.content.path;
      // console.log(this.uploadList, this.defaultList, res, file);
      this.showSpin = false;
      if (res.content.path) {
        this.$emit('resData', res.content);
      } else {
        this.$Notice.warning({
          title: '上传失败',
          desc: '文件  ' + file.name + ' 上传失败！！请联系管理员'
        });
      }
    },
    handleError(res, file) {
      this.$Notice.warning({
        title: '上传失败',
        desc: '文件  ' + file.name + ' 上传失败！！请重新上传.'
      });
      this.showSpin = false;
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件' + file.name + '格式不正确, 请重新上传。'
      });
      this.showSpin = false;
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '图片文件限制',
        desc: '文件  ' + file.name + ' 太大, 不能超过 10M.'
      });
      this.showSpin = false;
    },
    // 2021 4.19 舍弃action的默认上传方式，自定义上传。
    handleBeforeUpload(file) {
      let filebray = null;
      this.showSpin = true;
      const isTypeTrue = this.formate.some(
        item => item === file.name.split('.')[1]
      );
      if (file.size > this.maxSize) {
        // 限制文件的大小
        this.$Notice.warning({
          title: '图片文件限制',
          desc: '文件  ' + file.name + ' 太大, 不能超过 10M.'
        });
        this.showSpin = false;
        return false;
      } else if (isTypeTrue) {
        let formdata = new FormData();
        formdata.append('file', file);
        filebray = formdata;
        axios
          .request({
            url: this.uploadUrl,
            method: 'post',
            data: filebray
          })
          .then(res => {
            this.$emit('resData', res.data.content);
            this.showSpin = false;
          })
          .catch(() => {
            this.$Notice.warning({
              title: '上传失败',
              desc: '文件上传失败！！请联系管理员'
            });
          });
      } else {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件' + file.name + '格式不正确, 请重新上传。'
        });
        this.showSpin = false;
      }
      return false;
      // this.headers.Authorization = 'Basic ' + getToken();
      // this.headers.ProxyAuthorization = 'Basic ' + getToken();
      // if (this.headers.Authorization === 'Basic false') {
      //   this.$Notice.warning({
      //     title: '用户信息过期',
      //     desc: '此账号信息过期，请重新登录！'
      //   });
      //   return false;
      // } else {
      //   this.showSpin = true;
      //   // const check = this.uploadList.length < 1;
      //   // if (!check) {
      //   //   this.$Notice.warning({
      //   //     title: '不能超过1张.'
      //   //   });
      //   // }
      //   // return check;
      // }
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  }
};
</script>
<style lang="less" scoped>
.upload_component {
  position: relative;
}
</style>