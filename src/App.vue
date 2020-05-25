<!--
 * @Descripttion: 
 * @Author: sjq
 * @Date: 2020-04-28 17:13:54
 * @LastEditors: sjq
 * @LastEditTime: 2020-05-25 14:56:08
 -->
<template>
  <div id="app">
    123332
    <quill-editor
      :content="content"
      :options="editorOption"
      @change="onEditorChange($event)"
      ref="myQuillEditor"
    ></quill-editor>
    <el-upload
      :before-upload="beforeUpload"
      :show-file-list="false"
      action="https://jsonplaceholder.typicode.com/posts/"
      class="avatar-uploader"
      id="Pic"
    />
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';

let toolbarOptions = [
  //   // ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
  //   // ['blockquote', 'code-block'],     //引用，代码块

  //   // [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
  //   // [{ 'list': 'ordered' }, { 'list': 'bullet' }],     //列表
  //   // [{ 'script': 'sub' }, { 'script': 'super' }],   // 上下标
  //   // [{ 'indent': '-1' }, { 'indent': '+1' }],     // 缩进
  //   // [{ 'direction': 'rtl' }],             // 文本方向

  //   // [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
  //   // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题

  //   // [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
  //   // [{ 'font': [] }],     //字体
  //   // [{ 'align': [] }],    //对齐方式

  //   ['clean'],    //清除字体样式
  ['image', 'video'], //上传图片、上传视频
];
export default {
  name: 'App',
  components: {
    quillEditor,
  },
  data() {
    return {
      imageUrl: '',
      content: '<h2>I am Example</h2>',
      editorOption: {
        // some quill options
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              video: function(value) {
                if (value) {
                  document.querySelector('#Pic input').click();
                } else {
                  this.quill.format('image', false);
                }
              },
            },
          },
        },
      },
    };
  },

  // manually control the data synchronization
  // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
  methods: {
    onEditorChange({ html }) {
      // console.log('editor change!', quill, html, text)
      this.content = html;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeUpload(file) {
      // 应该在上传成功后
      let quill = this.$refs.myQuillEditor.quill;
      let length = quill.getSelection().index;
      // 插入图片  res.info为服务器返回的图片地址,res.data.url
      console.log(file);
      // 没有接口 写死的一个url 有的话就可以替换
      quill.insertEmbed(
        length,
        'video',
        'https://vod.pipi.cn/fe5b84bcvodcq1251246104/9dbef5b65285890797009576163/f0.mp4'
      );
      // 调整光标到最后
      quill.setSelection(length + 1);
      // this.dialogImageUrl = file.url;
    },
  },
  computed: {
    // editor () {
    //   return this.$refs.myQuillEditor.quill
    // }
  },
  mounted() {
    console.log('this is current quill instance object', this.editor);
  },
};
</script>

<style></style>
